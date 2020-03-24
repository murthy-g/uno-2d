import React, { useContext } from "react";
import BaseScene from "../../base/Base";
import SocketContext from "../../../shared/context/SocketContext";

const GameRoomPage = ({ history }) => {
  const socket = useContext(SocketContext);
  return (
    <div>
      You are in room: {history.location.state.roomName}
      <br />
      <BaseScene history={history} socket={socket} />
    </div>
  );
};

export default GameRoomPage;
