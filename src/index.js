import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import io from "socket.io-client";

ReactDOM.render(<App io={io("http://localhost:2020")} />, document.getElementById("root"));
