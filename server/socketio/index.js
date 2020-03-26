var sockets = {};

sockets.init = function(server) {
  var io = require("socket.io").listen(server);
  var Room = require("./handlers/room");
  var User = require("./handlers/user");
  var Reserved = require("./handlers/reserved");

  io.sockets.on("connection", function(socket) {
    var eventHandlers = {
      reserved: new Reserved(socket, io),
      chat: new Room(socket, io),
      user: new User(socket, io)
    };

    // Bind events to handlers
    for (var category in eventHandlers) {
      var handler = eventHandlers[category].handler;
      for (var event in handler) {
        socket.on(event, handler[event]);
      }
    }

    //   socket.on("join_room", function(roomId) {
    //     socket.join(roomId);
    //     usersInfo[user.name].currentRoom = roomId;
    //     roomsInfo[roomId].currentUsers.push(user.name);

    //     // to client-sender only
    //     socket.emit("join_room_response", {
    //       status: "success",
    //       data: {
    //         user: user.name,
    //         isAdmin: roomsInfo[roomId].adminUser === user.name,
    //         roomId: roomsInfo[roomId].id,
    //         roomName: roomsInfo[roomId].name
    //       }
    //     });

    //     // broadcast newly joined user to existing room's users
    //     io.to(roomId).emit("gameroom_users", {
    //       status: "success",
    //       data: { users: roomsInfo[roomId].currentUsers }
    //     });
    //     console.log(user.name + " successfully joined room: " + roomId);
    //   });

    //   socket.on("delete_room", function(username, roomId) {
    //     // TODO: kick all users out
    //     delete roomsInfo[roomId];
    //   });

    //   socket.on("disconnect", () => {
    //     if (user.name && usersInfo[user.name]) {
    //       listOfUsers.splice(listOfUsers.indexOf(user.name), 1);
    //       // if user is in a room, remove them from the list of currentUsers for that room
    //       if (user.currentRoom) {
    //         const index = roomsInfo[user.currentRoom].currentUsers.indexOf(user.name);
    //         roomsInfo[user.currentRoom].currentUsers.splice(index, 1);
    //         io.to(user.currentRoom).emit("gameroom_users", {
    //           status: "success",
    //           data: { users: roomsInfo[user.currentRoom].currentUsers }
    //         });
    //         console.log(user.name + " disconnected from " + user.currentRoom);
    //       }
    //       delete usersInfo[user.name];
    //       io.sockets.emit("connected_users", { status: "success", data: { users: listOfUsers } });
    //       console.log(user.name + " disconnected");
    //     }
    //   });
  });
};

module.exports = sockets;
