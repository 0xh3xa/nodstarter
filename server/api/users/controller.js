var User = require('./model');
var _ = require('lodash');
var signToken = require('../../auth').signToken;
var logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
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

exports.getOne = (req, res, next) => {
    var user = req.user;
    res.json(user);
};

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

exports.post = (req, res, next) => {
    var newUser = new User(req.body);
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
