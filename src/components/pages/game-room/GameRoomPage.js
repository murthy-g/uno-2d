import React, { useContext, useState, useEffect } from "react";
import SocketContext from "../../../shared/context/SocketContext";
import BaseScene from "../../base/Base";

const parseUrl = url => url.split("?id=")[1];

const GameRoomPage = ({ history }) => {
  const [roomName, setRoomName] = useState(null);
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("get_room", parseUrl(history.location.search), ({ status, data }) => {
      switch (status) {
        case "success":
          setRoomName(data.room.name);
          setAdmin(data.room.adminUser);
          setPlayers(data.room.currentUsers);
          break;
        case "error":
        default:
      }
    });
  }, []);

  useEffect(() => {
    socket.on("player_joined", ({ status, data }) => {
      setPlayers(players => players.concat(data.player));
    });
  }, [socket]);

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-10">
          <h4>{roomName}</h4>
        </div>
        <div className="col-2">
          {history.location.state.username === admin ? (
            <button type="button" className="btn btn-outline-danger btn-sm">
              Delete Room
            </button>
          ) : null}
        </div>
      </div>
      <div>I am: {history.location.state.username}</div>
      <BaseScene
        players={players}
        isAdmin={history.location.state.username === admin}
        socket={socket}
      />
      <h5>Players in this room:</h5>
      <ul className="list-group">
        {players.map(player => (
          <li className="list-group-item py-1">{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameRoomPage;
