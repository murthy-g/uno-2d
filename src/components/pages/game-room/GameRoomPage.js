import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../../../shared/context/SocketContext";

const GameRoomPage = ({ history }) => {
  const [gameRoomUsers, setGameRoomUsers] = useState([]);
  // const [admin, setAdmin] = useState(null);
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
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-10">
          <h4>{history.location.state.roomName} </h4>
        </div>
        <div className="col-2">
          {history.location.state.isAdmin ? (
            <button type="button" className="btn btn-outline-danger btn-sm">
              Delete Room
            </button>
          ) : null}
        </div>
      </div>
      <div>I am: {history.location.state.user}</div>

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
