import React, { useRef, useEffect, useState } from "react";

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
    margin: "auto",
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
  console.log(props);
  const inputEl = useRef(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    props.user(user);
  });
  function handleFocus() {
    setUser(inputEl.current.value);
    console.group(props);
    // if (inputEl.current.value.length > 0) {
    //   props.socket.emit("user", inputEl.current.value);
    // }
  }
  return (
    <div style={style.depth}>
      Enter your userName: <input type="text" ref={inputEl} placeholder="name" />
      <button onClick={handleFocus} style={style.button}>
        Enter
      </button>
    </div>
  );
};

export default User;
