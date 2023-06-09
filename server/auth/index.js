const { expressjwt: jwt } = require("express-jwt");
const config = require('../config');
const logger = require('../util/logger');
const jwttoken = require('jsonwebtoken');
const checkToken = jwt({
    secret: config.secrets.jwt,
    algorithms: ['RS256']
});
const User = require('../api/users/model');
exports.decodeToken = () => {
    return (req, res, next) => {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
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

        console.log(username,password);

        if (!username || !password) {
            res.status(400).send('You need a username and password');
            return;
        }

        User.findOne({
                username: username
            })
            .then((user) => {
                logger.log('the selected user from DB: ' + user);
                if (!user) {
                    logger.log('No user with the given username');
                    res.status(401).send('Invalid username or password');
                } else if (!user.authenticate(password)) {
                    logger.log('Invalid password');
                    res.status(401).send('Invalid username or password');
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
    return jwttoken.sign({
        _id: id
    }, config.secrets.jwt, {
        expiresIn: config.expireTime
    });
};
