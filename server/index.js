var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const routes = require("./api");
const connect = require("./components/connect");
const shortid = require("shortid");

app.set("json spaces", 2);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

// connect.init();
// let adminUser = [];
let users2 = {};
let rooms2 = {};
let users = [];
let rooms = [];
io.on("connection", function(socket) {
  let user = {
    name: null,
    room: null,
    socketId: null
  };
  let room = {
    id: null,
    name: null
  };

  socket.on("join_room", function(roomId) {
    socket.join(roomId);
    console.log(user.name + " successfully joined room: " + roomId);
  });

  socket.on("create_room", function(roomName) {
    if (rooms.findIndex(room => room.name === roomName) === -1) {
      room = {
        id: shortid.generate(),
        name: roomName
      };
      rooms.push(room);
      socket.join(room.id);
      socket.emit("create_room_response", { status: "success", data: room });
      io.sockets.emit("all_rooms", { status: "success", data: { rooms: rooms } });
      console.log(user.name + " successfully created room: " + roomName);
    } else {
      socket.emit("create_room_response", {
        status: "error",
        data: { message: "There is already a room with that name." }
      });
      console.log(user.name + " entered a duplicate room name: " + roomName);
    }
  });

  socket.on("cards", function(user) {
    console.log(user)
    const usr = {
      name: user.name,
      room: user.room,
      socketId: user.socketId,
      cards: user.cards
    };
    socket.emit("add_user_response", { status: "success", data: { user: usr } });
  });
  socket.on("add_user", function(username) {
    user = {
      name: username,
      room: null,
      socketId: socket.id
    };
    if (users.findIndex(user => user.name === username) === -1) {
      users.push(user);
      socket.emit("add_user_response", { status: "success", data: { user: user } });
      io.sockets.emit("connected_users", users);
      io.sockets.emit("all_rooms", { status: "success", data: { rooms: rooms } });
      console.log(username + " connected");
    } else {
      socket.emit("add_user_response", {
        status: "error",
        data: { message: "Username already in use." }
      });
      console.log(username + " : duplicate user entered");
    }
  });

  socket.on("disconnect", () => {
    if (user.name && users.findIndex(item => item.name === user.name) !== -1) {
      const index = users.findIndex(item => item.name === user.name);
      users.splice(index, 1);
      io.sockets.emit("connected_users", users);
      console.log(user.name + " disconnected...");
    }
  });
});

http.listen(2020, function() {
  console.log("listening on *:2020");
});
