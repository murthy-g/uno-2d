'use strict';

const mongoose = require('mongoose');

const pingSchema = new mongoose.Schema({
  ping: {type: String, required: false, index: true, unique: true},
});

module.exports = mongoose.model('ping', pingSchema);
