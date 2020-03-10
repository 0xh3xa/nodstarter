// Import Express router
var router = require('express').Router();

// Import logger
var logger = require('../../util/logger');

// Import user controller
var controller = require('./postController');

// Import createRouter util
var createRouter = require('../../util/createRouter');

// Pass contronller and router and assign GET, POST, PUT, DELETE
createRouter(controller, router);

// Expose router
module.exports = router;
