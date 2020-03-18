import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../../../shared/context/SocketContext";

const JoinCreateRoomPage = ({ rooms, users }) => {
  const socket = useContext(SocketContext);
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
  });

  const joinRoom = id => {
    socket.emit("join_room", id);
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
            className="list-group-item list-group-item-action"
            id={room.name}
            onClick={() => joinRoom(room.name)}
          >
            {room.name}
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
