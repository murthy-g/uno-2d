var RoomModel = require("../../models/room.model");
var UserModel = require("../../models/user.model");

var Reserved = function(socket, io) {
  this.socket = socket;
  this.io = io;

  this.handler = {
    disconnect: disconnect.bind(this)
  };
};

function disconnect() {
  // remove user from the room they're in (if any)
  RoomModel.findOneAndUpdate(
    { currentUsers: this.socket.handshake.username },
    { $pull: { currentUsers: this.socket.handshake.username } },
    { new: true },
    (error, document) => {}
  );

  // TODO: what happens if user disconnects from a room that they're an admin of?

  // remove user from the database
  UserModel.deleteOne({ name: this.socket.handshake.username }, error => {
    // TODO: handle error
  });
}

module.exports = Reserved;
