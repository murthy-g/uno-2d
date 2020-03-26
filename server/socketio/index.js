var sockets = {};

sockets.init = function(server) {
  var io = require("socket.io").listen(server);
  var Room = require("./handlers/room");
  var User = require("./handlers/user");
  var Reserved = require("./handlers/reserved");
  var Game = require("./handlers/game");

  io.sockets.on("connection", function(socket) {
    var eventHandlers = {
      reserved: new Reserved(socket, io),
      chat: new Room(socket, io),
      user: new User(socket, io),
      game: new Game(socket, io)
    };

    // Bind events to handlers
    for (var category in eventHandlers) {
      var handler = eventHandlers[category].handler;
      for (var event in handler) {
        socket.on(event, handler[event]);
      }
    }

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
