import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../../../shared/context/SocketContext";

const GameRoomPage = ({ history }) => {
  const [gameRoomUsers, setGameRoomUsers] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("gameroom_users", ({ status, data }) => {
      switch (status) {
        case "success":
          const { users } = data;
          setGameRoomUsers(users);
          break;
        default:
      }
    });
  }, [socket]);

  return (
    <div>
      <h4>{history.location.state.roomName} </h4>
      <h5>Users in this room:</h5>
      <ul className="list-group">
        {gameRoomUsers.map(user => (
          <li className="list-group-item py-1">{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameRoomPage;
