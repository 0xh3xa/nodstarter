const router = require('express').Router();
const controller = require('./controller');
const createRouter = require('../../util/createRouter');

createRouter(controller, router);

module.exports = router;
