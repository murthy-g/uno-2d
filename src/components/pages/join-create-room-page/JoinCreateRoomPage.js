import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SocketContext from "../../../shared/context/SocketContext";

const JoinCreateRoomPage = ({ rooms, users }) => {
  const socket = useContext(SocketContext);
  const history = useHistory();
  const [roomInput, setRoomInput] = useState("");
  const [roomAlert, setRoomAlert] = useState(false);

  useEffect(() => {
    socket.on("create_room_response", ({ status, data }) => {
      switch (status) {
        case "success":
          setRoomAlert(false);
          setRoomInput("");
          break;
        case "error":
          const { message } = data;
          setRoomAlert(message);
          break;
        default:
          setRoomAlert("Error creating a room. Try again.");
      }
    });

    socket.on("join_room_response", ({ status, data }) => {
      switch (status) {
        case "success":
          const { user, isAdmin, roomId, roomName } = data;
          history.push({
            pathname: "/room",
            search: "?id=" + roomId,
            state: { user: user, isAdmin: isAdmin, roomName: roomName, roomId: roomId }
          });
          break;
        case "error":
          break;
        default:
      }
    });
  }, [socket, history]);

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
          <li className="list-group-item">{user} is connected</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
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
