import React, { useState, useContext } from "react";
import SocketContext from "../../../shared/context/SocketContext";

const UserLoginPage = ({ submitUsername }) => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");

  const validateUsername = e => {
    if (username) {
      submitUsername(username);
      socket.emit("addUser", username);
    }
  };

  return (
    <div className="row align-items-center full-height">
      <div className="col text-center">
        <div>Enter your username: </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="username"
            aria-describedby="username"
            onKeyDown={e => {
              if (e.key === "Enter") validateUsername(e);
            }}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <div className="input-group-append">
            <button type="button" className="btn btn-primary" onClick={e => validateUsername(e)}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
