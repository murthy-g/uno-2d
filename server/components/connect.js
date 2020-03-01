'use strict';

const dbUrl = 'mongodb://localhost:27017/uno';
const mongoose = require('mongoose');

let connection = false;
const connect = {
  dbStatus: false,
  init: function() {
    if (!connection) {
      connection = mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        connectTimeoutMS: 1000,
      });
    }
  },
};

mongoose.connection.on('connecting', function() {
  connect.dbStatus = false;
  connection = false;
});

mongoose.connection.on('error', function(err) {
  connect.dbStatus = false;
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', function() {
  connect.dbStatus = false;
  connection = false;
  setTimeout(connect.init, 27017);
});

module.exports = connect;
