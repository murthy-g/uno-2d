const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomModel = new Schema({
  id: String,
  name: String,
  adminUser: String,
  currentUsers: [String]
});

module.exports = mongoose.model("rooms", roomModel);
