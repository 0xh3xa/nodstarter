var router = require('express').Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

// before we send back jwt, let's check
// the password and username match what's in the DB
router.post('/signin', verifyUser(), controller.sigin);

module.exports = router;
