import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2020");

// export const SocketContext = React.createContext(null)
export const emit = (key, value) => {
  socket.emit(key, value);
};

export const receive = event => {
  return new Promise(resolve => {
    socket.on(event, msg => {
      resolve(msg);
    });
  });
};

// export const socketIO = {
//   emit: emit
// };
