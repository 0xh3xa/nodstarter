var router = require('express').Router();
var verifyUser = require('./index').verifyUser;
var controller = require('./controller');

router.post('/signin', verifyUser(), controller.sigin);

module.exports = router;
