// Import userModel
var User = require('./userModel');

// Import lodash
var _ = require('lodash');

var signToken = require('../../auth/auth').signToken;

// Import logger
var logger = require('../../util/logger');

// Middleware for all /id in the Url
// Find category and attach to the request
// Then move to the next which means the method of the request
exports.params = (req, res, next, id) => {

    // Check the Mongo DB by this id
    // If find attach it to the request and move to next middleware
    // If not assign error and move to error middleware
    User.findById(id)
        .then((user) => {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user;
                next();
            }
        }, (err) => {
            next(err);
        });
};

// GET all users
exports.get = (req, res, next) => {
    User.find({})
        .select('-password')
        .then((users) => {
            logger.log(users);
            return res.json(users.map((user) => {
                return user.toJson();
            }));
        }, (err) => {
            next(err);
        });
};

// GET one, after execute params add json to the response
exports.getOne = (req, res, next) => {
    var user = req.user;
    res.json(user);
};

// Update request for the category
exports.put = (req, res, next) => {
    var user = req.user;

    var updatedUser = req.body;

    _.merge(user, updatedUser);

    user.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

// Create new User
exports.post = (req, res, next) => {
    // get user object from body
    var newUser = new User(req.body);
    // Insert into Mongo and return the user with JSON format
    newUser.save(function (err, user) {
        if (err) {
            next(err);
        }
        var token = signToken(user._id);
        res.json({
            token: token
        });
    });
};

// Delete the user by id
exports.delete = (req, res, next) => {
    req.user.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

exports.me = (req, res, next) => {
    res.json(req.user.toJson());
};
