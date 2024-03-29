const router = require('express').Router();
const verifyUser = require('./index').verifyUser;
const controller = require('./controller');
const signToken = require('./index').signToken;

router.post('/signin', verifyUser(), controller.sigin);

module.exports = router;
