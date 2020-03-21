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

let usersInfo = {};
let roomsInfo = {};
let listOfUsers = []; // contains only username strings
let listOfRooms = [];

io.on("connection", function(socket) {
  let user = {
    name: null,
    currentRoom: null
  };
  let room = {
    id: null,
    name: null,
    currentUsers: []
  };

  socket.on("join_room", function(roomId) {
    socket.join(roomId);
    usersInfo[user.name].currentRoom = roomId;
    roomsInfo[roomId].currentUsers.push(user.name);

    // to client-sender only
    socket.emit("join_room_response", {
      status: "success",
      data: { roomId: roomsInfo[roomId].id, roomName: roomsInfo[roomId].name }
    });

    // broadcast newly joined user to existing room's users
    io.to(roomId).emit("gameroom_users", {
      status: "success",
      data: { users: roomsInfo[roomId].currentUsers }
    });
    console.log(user.name + " successfully joined room: " + roomId);
  });

  socket.on("create_room", function(roomName) {
    const cleanString = roomName
      .trim()
      .toLowerCase()
      .replace(/ /g, "-");

    if (!roomsInfo[cleanString]) {
      room.id = cleanString;
      room.name = roomName;

      roomsInfo[room.id] = room;
      listOfRooms.push(room);
      // socket.join(room.id);
      socket.emit("create_room_response", { status: "success", data: { room: room } });
      io.sockets.emit("all_rooms", { status: "success", data: { rooms: listOfRooms } });
      console.log(user.name + " successfully created room: " + roomName);
    } else {
      socket.emit("create_room_response", {
        status: "error",
        data: { message: "There is already a room with that name." }
      });
      console.log(user.name + " entered a duplicate room name: " + roomName);
    }
  });

  socket.on("add_user", function(username) {
    user.name = username;

    if (!usersInfo[username]) {
      usersInfo[username] = user;
      listOfUsers.push(username);
      socket.emit("add_user_response", { status: "success", data: { user: user } });
      io.sockets.emit("connected_users", { status: "success", data: { users: listOfUsers } });
      io.sockets.emit("all_rooms", { status: "success", data: { rooms: listOfRooms } });
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
    if (user.name && usersInfo[user.name]) {
      listOfUsers.splice(listOfUsers.indexOf(user.name), 1);
      // if user is in a room, remove them from the list of currentUsers for that room
      if (user.currentRoom) {
        const index = roomsInfo[user.currentRoom].currentUsers.indexOf(user.name);
        roomsInfo[user.currentRoom].currentUsers.splice(index, 1);
        io.to(user.currentRoom).emit("gameroom_users", {
          status: "success",
          data: { users: roomsInfo[user.currentRoom].currentUsers }
        });
        console.log(user.name + " disconnected from " + user.currentRoom);
      }
      delete usersInfo[user.name];
      io.sockets.emit("connected_users", { status: "success", data: { users: listOfUsers } });
      console.log(user.name + " disconnected");
    }
  });
});

http.listen(2020, function() {
  console.log("listening on *:2020");
});
