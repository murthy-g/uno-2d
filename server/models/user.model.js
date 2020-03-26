const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema({
  name: String,
  adminOf: String,
  currentRoom: String
});

module.exports = mongoose.model("users", userModel);
