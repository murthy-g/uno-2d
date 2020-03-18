var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const routes = require("./api");
const connect = require("./components/connect");

app.set("json spaces", 2);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

// connect.init();
// let adminUser = [];

let users = [];
let rooms = [];
io.on("connection", function(socket) {
  let user = {
    name: null,
    room: null,
    socketId: null
  };
  // socket.on("create", function(room) {
  //   socket.join(room);
  //   io.in(room).clients((err, client) => {
  //     adminUser.forEach(usr => {
  //       if (usr.socketId === client[0]) {
  //         usr.roomName = room;
  //       }
  //     });
  //     users.forEach(usr => {
  //       if (usr.socketId === client) {
  //         usr.roomName = room;
  //       }
  //     });
  //     console.log(room + " has been created by the user " + usr.user);
  //     socket.emit("room", usr);
  //     // console.log(room + " has been created and user " + io.nsps["/"].adapter.rooms[room]);
  //     // io.sockets.in(room).emit("room", usr);
  //   });
  // });

  // TODO: identify rooms by a unique ID rather than name
  socket.on("join_room", function(roomId) {
    socket.join(roomId);
    console.log(user.name + " successfully joined room: " + roomId);
  });

  socket.on("create_room", function(roomId) {
    if (rooms.findIndex(room => room.name === roomId) === -1) {
      rooms.push({ name: roomId });
      socket.join(roomId);
      socket.emit("create_room_response", { status: "success", data: { room: roomId } });
      io.sockets.emit("all_rooms", { status: "success", data: { rooms: rooms } });
      console.log(user.name + " successfully created room: " + roomId);
    } else {
      socket.emit("create_room_response", {
        status: "error",
        data: { message: "There is already a room with that name." }
      });
      console.log(user.name + " entered a duplicate room name: " + roomId);
    }
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
      // io.sockets.connected[user.name].emit(username + " already exists");
      console.log(username + " : duplicate user entered");
    }
  });

  socket.on("getAllUsers", function() {
    io.sockets.emit("serverUsers", users);
  });

  socket.on("disconnect", () => {
    if (user.name && users.findIndex(item => item.name === user.name) !== -1) {
      const index = users.findIndex(item => item.name === user.name);
      users.splice(index, 1);
      io.sockets.emit("connected_users", users);
      console.log(user.name + " disconnected...");
    }
  });

  // socket.on("adminUser", function(user) {
  //   usr = {
  //     user: user,
  //     roomName: null,
  //     socketId: socket.id
  //   };
  //   if (adminUser.indexOf({ user: usr.user }) === -1) {
  //     adminUser.push(usr);
  //     console.log(user + " user connected");
  //   } else {
  //     console.log(io.sockets);
  //     io.sockets.connected[usr.user].emit(user + ": only one admin is allowed.");
  //     console.log(user + " admin user tried to connect. but another admin user connected");
  //   }
  // });
});

http.listen(2020, function() {
  console.log("listening on *:2020");
});
