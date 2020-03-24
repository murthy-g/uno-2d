import React, { useState, useEffect, useContext } from "react";
import JoinCreateRoomPage from "../join-create-room-page/JoinCreateRoomPage";
import UserLoginPage from "../user-login-page/UserLoginPage";
import SocketContext from "../../../shared/context/SocketContext";

const LandingPage = history => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on("connected_users", data => {
      setUsers(data);      
      history.history.users = data;
    });

    socket.on("all_rooms", ({ status, data }) => {
      const { rooms } = data;
      setRooms(rooms);
    });
  }, [socket, users, rooms]);

  return (
    <>
      {!username && (
        <UserLoginPage
          onGo={name => {
            setUsername(name);
          }}
        />
      )}
      {username && <JoinCreateRoomPage users={users} rooms={rooms} />}
    </>
  );
};

export default LandingPage;
