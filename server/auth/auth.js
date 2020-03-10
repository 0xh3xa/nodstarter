var expressJwt = require('express-jwt');
var config = require('../config/config');
var logger = require('../util/logger');
var jwt = require('jsonwebtoken');
var checkToken = expressJwt({
    secret: config.secrets.jwt
});
var User = require('../api/users/userModel');
exports.decodeToken = () => {
    return (req, res, next) => {
        // Make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // Will see the req.headers.authorization if valid or not
        // This will call next if token is valid
        // and send error if its not. It will attached
        // the decoded token to req.user
        checkToken(req, res, next);
    };
};

exports.getFreshUser = () => {
    return (req, res, next) => {
        User.findById(req.user._id)
            .then((user) => {
                if (!user) {
                    res.status(400).send('Unanuthorized');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.verifyUser = () => {
    return (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        logger.log('the username: ' + username);
        logger.log('the password: ' + password);

        if (!username || !password) {
            res.status(400).send('You need a username ans password');
            return;
        }

        User.findOne({
                username: username
            })
            .then((user) => {
                logger.log('the selected user from DB: ' + user);
                if (!user) {
                    res.status(401).send('No user with the given username');
                } else if (!user.authenticate(password)) {
                    res.status(401).send('wrong password');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.signToken = (id) => {
    logger.log("id is: " + id);
    return jwt.sign({
        _id: id
    }, config.secrets.jwt, {
        expiresIn: config.expireTime
    });
};
