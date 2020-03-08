import React, { useRef, useEffect, useState } from "react";
import * as socketIO from "../../shared/context/socket";

const style = {
  depth: {
    display: "block",
    border: "1px solid rgba(255,255,255,0.6)",
    background: "linear-gradient(#eee, #fff)",
    transition: "all 0.3s ease-out",
    boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
    padding: "5px",
    color: "#F00",
    textAlign: "center",
    fontFamily: "customfont",
    margin: "auto",
    width: "20%",
    height: "10%",
    top: "45%",
    left: "40%",
    position: "absolute"
  },
  button: {
    width: "21%",
    top: "50%",
    left: "40%",
    position: "absolute",
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer"
  }
};
const User = props => {
  // console.log(props);
  const userInput = useRef(null);
  const roomInput = useRef(null);
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [room, setRoom] = useState(null);
  useEffect(() => {
    props.user(user);
  });
  function handleFocus() {
    setUser(userInput.current.value);
    if (userInput.current.value.length > 0) {
      socketIO.emit("user", userInput.current.value);
    }
  }
  function handleAdminUser() {
    setAdminUser(userInput.current.value);
    socketIO.receive(userInput.current.value);
    if (userInput.current.value.length > 0) {
      socketIO.emit("adminUser", userInput.current.value);
    }
  }
  function handleRoomFocus() {
    setRoom(roomInput.current.value);
    socketIO.emit("create", roomInput.current.value);
  }
  return (
    <div style={style.depth}>
      Enter your userName: <input type="text" ref={userInput} placeholder="name" />
      <button onClick={handleFocus} style={style.button}>
        User
      </button>
      <button onClick={handleAdminUser} style={style.button}>
        Admin
      </button>
      {adminUser && adminUser.length > 0 && (
        <>
          <label>Enter Room Name:</label> <input type="text" ref={roomInput} placeholder="room" />
          <button onClick={handleRoomFocus} style={style.button}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default User;
