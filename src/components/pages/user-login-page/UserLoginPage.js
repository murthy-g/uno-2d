import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as socketIO from "../../../shared/context/socket";

const UserLoginPage = props => {
  const history = useHistory();
  const userInput = useRef(null);
  const roomInput = useRef(null);
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    props.user(user);
  });

  const handleFocus = () => {
    setUser(userInput.current.value);
    if (userInput.current.value.length > 0) {
      socketIO.emit("user", userInput.current.value);
    }
  };

  const handleAdminUser = () => {
    setAdminUser(userInput.current.value);
    socketIO.receive(userInput.current.value);
    if (userInput.current.value.length > 0) {
      socketIO.emit("adminUser", userInput.current.value);
    }
  };

  const handleRoomFocus = () => {
    setRoom(roomInput.current.value);
    socketIO.emit("create", roomInput.current.value);
    socketIO.receive("room").then(msg => {
      socketIO.emit("selectRoom", msg.room); // TO DO
    });
  };

  const validateUsername = e => {
    if (userInput.current.value) {
      history.push("/rooms");
    }
  };

  return (
    <div className="row align-items-center full-height">
      <div className="col text-center">
        <div>Enter your username: </div>
        <div class="input-group">
          <input
            ref={userInput}
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="username"
            aria-describedby="username"
            onKeyDown={e => {
              if (e.key === "Enter") validateUsername(e);
            }}
          />
          <div class="input-group-append">
            <button type="button" class="btn btn-primary" onClick={e => validateUsername(e)}>
              Go
            </button>
          </div>
        </div>
      </div>

      {/* <button onClick={handleFocus}>User</button>
      <button onClick={handleAdminUser}>Admin</button>
      {adminUser && adminUser.length > 0 && (
        <>
          <label>Enter Room Name:</label> <input type="text" ref={roomInput} placeholder="room" />
          <button onClick={handleRoomFocus}>Login</button>
        </>
      )} */}
    </div>
  );
};

export default UserLoginPage;
