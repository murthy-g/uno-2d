var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const routes = require("./api");
const connect = require("./components/connect");

app.set("json spaces", 2);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

connect.init();
let adminUser = [];
let usr = {
  user: null,
  roomName: null,
  socketId: null
};
let users = [];
io.on("connect", function(socket) {
  socket.on("create", function(room) {
    socket.join(room);
    io.in(room).clients((err, client) => {
      adminUser.forEach(usr => {
        if (usr.socketId === client[0]) {
          usr.roomName = room;
        }
      });
      users.forEach(usr => {
        if (usr.socketId === client) {
          usr.roomName = room;
        }
      });
      console.log(room + " has been created by the user " + usr.user);
      socket.emit("room", usr);
      // console.log(room + " has been created and user " + io.nsps["/"].adapter.rooms[room]);
      // io.sockets.in(room).emit("room", usr);
    });
  });
  socket.on("user", function(user) {
    usr = {
      user: user,
      roomName: null,
      socketId: socket.id
    };
    if (users.indexOf({ user: usr.user }) === -1) {
      users.push(usr);
      console.log(user + " user connected");
    } else {
      io.sockets.connected[usr.user].emit(user + " already exists");
      console.log(user + " : duplicate user entered.");
    }
  });
  socket.on("adminUser", function(user) {
    usr = {
      user: user,
      roomName: null,
      socketId: socket.id
    };
    if (adminUser.indexOf({ user: usr.user }) === -1) {
      adminUser.push(usr);
      console.log(user + " user connected");
    } else {
      console.log(io.sockets);
      io.sockets.connected[usr.user].emit(user + ": only one admin is allowed.");
      console.log(user + " admin user tried to connect. but another admin user connected");
    }
  });
});

http.listen(2020, function() {
  console.log("listening on *:2020");
});
