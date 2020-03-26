var UserModel = require("../../models/user.model");

var User = function(socket, io) {
  this.socket = socket;
  this.io = io;

  this.handler = {
    get_all_users: get_all_users.bind(this),
    get_user: get_user.bind(this),
    add_user: add_user.bind(this),
    ping: ping.bind(this)
  };
};

function get_all_users(callback) {
  UserModel.find({}, (err, users) => {
    callback({ status: "success", data: { users: users } });
  });
}

function get_user(username, callback) {
  UserModel.findOne({ name: username }, (err, user) => {
    callback({ status: "success", data: { user: user } });
  });
}

function add_user(username) {
  UserModel.countDocuments({ name: username }, (err, count) => {
    if (count === 0) {
      const user = new UserModel({
        name: username,
        adminOf: null,
        currentRoom: null
      });
      user.save((err, user) => {
        this.socket.emit("add_user_response", { status: "success", data: { user: user } });
        this.io.sockets.emit("new_user", { status: "success", data: { user: user } });
      });

      this.socket.handshake.username = username; // set username here to make it accessible for other handlers
    } else {
      this.socket.emit("add_user_response", {
        status: "error",
        data: { message: "The username " + username + " is already in use" }
      });
    }
  });
}

function ping() {
  // Reply to sender
  this.socket.emit("ping", "pong");
}

module.exports = User;
