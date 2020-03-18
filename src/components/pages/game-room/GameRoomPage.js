import React from "react";

const GameRoomPage = ({ history }) => {
  return <div>You are in room: {history.location.state.roomName} </div>;
};

export default GameRoomPage;
