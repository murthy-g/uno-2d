import React from "react";

const JoinCreateRoomPage = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div>{user.name} is connected</div>
      ))}
    </div>
  );
};

export default JoinCreateRoomPage;
