import React from "react";
import io from "socket.io-client";

const socketIO = io("http://localhost:2020");

// export const SocketContext = React.createContext(null)

export const emit = (key, value) => {
  socketIO.emit(key, value);
};

export const receive = (user, msg) => {
  console.log(user, msg);
  socketIO.on(user, msg);
};

// export const socketIO = {
//   emit: emit
// };
