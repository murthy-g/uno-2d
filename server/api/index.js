const express = require('express');
const router = express.Router();

const pingController = require('../controllers/ping.controller');

router.get('/ping', pingController);

module.exports = router;
