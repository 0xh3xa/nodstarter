var router = require('express').Router();
var controller = require('./controller');
var createRouter = require('../../util/createRouter');

createRouter(controller, router);

module.exports = router;
