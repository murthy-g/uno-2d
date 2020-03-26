import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SocketContext from "../../../shared/context/SocketContext";

const JoinCreateRoomPage = () => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomInput, setRoomInput] = useState("");
  const [roomAlert, setRoomAlert] = useState(false);

  useEffect(() => {
    socket.emit("get_all_rooms", ({ status, data }) => {
      switch (status) {
        case "success":
          setRooms(data.rooms);
          break;
        case "error":
        default:
      }
    });

    socket.emit("get_all_users", ({ status, data }) => {
      switch (status) {
        case "success":
          console.log(data.users);
          setUsers(data.users);
          break;
        case "error":
        default:
      }
    });
  }, []);

  useEffect(() => {
    socket.on("create_room_response", ({ status, data }) => {
      switch (status) {
        case "success":
          setRoomAlert(false);
          setRoomInput("");
          break;
        case "error":
          setRoomAlert(data.message);
          break;
        default:
          setRoomAlert("Error creating a room. Try again.");
      }
    });

    socket.on("join_room_response", ({ status, data }) => {
      switch (status) {
        case "success":
          history.push({
            pathname: "/room",
            search: "?id=" + data.roomId,
            state: { username: data.username }
          });
          break;
        case "error":
          break;
        default:
      }
    });

    socket.on("new_room", ({ status, data }) => {
      switch (status) {
        case "success":
          setRooms(rooms => rooms.concat(data.room));
          break;
        case "error":
        default:
      }
    });

    socket.on("new_user", ({ status, data }) => {
      switch (status) {
        case "success":
          setUsers(users => users.concat(data.user));
          break;
        case "error":
        default:
      }
    });
  }, [socket]);

  const joinRoom = id => {
    socket.emit("join_room", id);
    // TODO: handle error
  };

  const createRoom = () => {
    // CLIENT SIDE room name validation
    if (roomInput) {
      socket.emit("create_room", roomInput);
    }
  };

  const showListOfRooms = () => (
    <>
      <h1>Rooms</h1>
      <ul className="list-group">
        {rooms.map(room => (
          <button
            type="button"
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            id={room.id}
            onClick={() => joinRoom(room.id)}
          >
            {room.name}
            <span className="badge badge-primary badge-pill">{"Admin: " + room.adminUser}</span>
          </button>
        ))}
      </ul>
    </>
  );

  const showListOfUsers = () => (
    <div className="mt-3">
      <h4>Connected Users</h4>
      <ul className="list-group">
        {users.map(user => (
          <li className="list-group-item">{user.name} is connected</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">
      {showListOfRooms()}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={e => setRoomInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") createRoom(e);
          }}
          value={roomInput}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" onClick={() => createRoom()}>
            Create Room
          </button>
        </div>
      </div>
      {roomAlert && (
        <div className="alert alert-danger" role="alert">
          {roomAlert}
        </div>
      )}
      {showListOfUsers()}
    </div>
  );
};

export default JoinCreateRoomPage;
