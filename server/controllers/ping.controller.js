'use strict';

const Ping = require('../models/ping.model');
const mongoService = require('../services/mongo.service');

function pingController(req, res) {
  mongoService.getMongoData
    .find('ping', Ping)
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
}

module.exports = pingController;
