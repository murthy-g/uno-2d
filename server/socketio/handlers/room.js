var RoomModel = require("../../models/room.model");
var UserModel = require("../../models/user.model");

var Room = function(socket, io) {
  this.socket = socket;
  this.io = io;

  this.handler = {
    get_all_rooms: get_all_rooms.bind(this),
    get_room: get_room.bind(this),
    create_room: create_room.bind(this),
    join_room: join_room.bind(this),
    ping: ping.bind(this)
  };
};

function get_all_rooms(callback) {
  RoomModel.find({}, (err, rooms) => {
    callback({ status: "success", data: { rooms: rooms } });
  });
}

function get_room(roomId, callback) {
  RoomModel.findOne({ id: roomId }, (err, room) => {
    callback({ status: "success", data: { room: room } });
  });
}

function create_room(roomName) {
  const cleanedRoomId = cleanString(roomName);
  RoomModel.countDocuments({ id: cleanedRoomId }, (err, count) => {
    if (count === 0) {
      const room = new RoomModel({
        id: cleanedRoomId,
        name: roomName,
        adminUser: this.socket.handshake.username,
        currentUsers: []
      });

      // add new room to database
      room.save((err, room) => {
        this.socket.emit("create_room_response", { status: "success" });
        this.io.sockets.emit("new_room", { status: "success", data: { room: room } });
      });

      // find the user in the database and make them the admin of the newly created room
      UserModel.findOneAndUpdate(
        { name: this.socket.handshake.username },
        { $set: { adminOf: cleanedRoomId } },
        (error, document) => {}
      );
    } else {
      this.socket.emit("create_room_response", {
        status: "error",
        data: { message: "There is already a room with that name." }
      });
    }
  });
}

function join_room(roomId) {
  // TODO: check if room is joinable (e.g game not in session already, max number of users not reached)
  this.socket.join(roomId);

  // update user's current room
  UserModel.findOneAndUpdate(
    { name: this.socket.handshake.username },
    { $set: { currentRoom: roomId } },
    { new: true },
    (error, document) => {}
  );

  // update list of players in joined  room
  RoomModel.findOneAndUpdate(
    { id: roomId },
    { $push: { currentUsers: this.socket.handshake.username } },
    { new: true },
    (error, document) => {
      this.socket.emit("join_room_response", {
        status: "success",
        data: { roomId: document.id, roomName: document.name, adminUser: document.adminUser }
      });
      this.socket.broadcast.to(roomId).emit("player_joined", {
        status: "success",
        data: { player: this.socket.handshake.username }
      });
    }
  );
}

function ping() {
  this.socket.emit("ping", "pong");
}

function cleanString(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-");
}

module.exports = Room;
