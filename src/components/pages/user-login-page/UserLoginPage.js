import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SocketContext from "../../../shared/context/SocketContext";

const UserLoginPage = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    socket.on("add_user_response", ({ status, data }) => {
      switch (status) {
        case "success":
          history.push("/rooms");
          break;
        case "error":
          setAlert(data.message);
          break;
        default:
          setAlert("Error logging in. Please try again.");
      }
    });
  }, [socket]);

  // useEffect(() => {
  //   localStorage.setItem("uno-username", username);
  // }, [username]);

  const validateUsername = e => {
    // CLIENT SIDE validation
    if (username) {
      socket.emit("add_user", username);
    } else {
      setAlert("Please enter a valid username.");
    }
  };

  return (
    <div className="container">
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
          {alert && (
            <div className="alert alert-danger" role="alert">
              {alert}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
