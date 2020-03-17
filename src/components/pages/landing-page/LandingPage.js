import React, { useState, useEffect, useContext } from "react";
import JoinCreateRoomPage from "../join-create-room-page/JoinCreateRoomPage";
import UserLoginPage from "../user-login-page/UserLoginPage";
import SocketContext from "../../../shared/context/SocketContext";

const LandingPage = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);

  // Could move this listener to the JoinCreateRoomPage
  useEffect(() => {
    socket.on("connected_users", data => {
      setUsers(data);
    });
  }, [socket, users]);

  return (
    <>
      {!username && (
        <UserLoginPage
          onGo={name => {
            setUsername(name);
          }}
        />
      )}
      {username && <JoinCreateRoomPage users={users} />}
    </>
  );
};

export default LandingPage;
