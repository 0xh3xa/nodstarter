var Post = require('./model');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
    post.findById(id)
        .populate('author', 'username')
        .exec()
        .then((post) => {
            if (!post) {
                next(new Error('No post with that id'));
            } else {
                req.post = post;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Post.find({})
        .populate('author categories')
        .exec()
        .then((posts) => {
            logger.log(posts);
            return res.json(posts);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    var post = req.post;
    res.json(post);
};

exports.put = (req, res, next) => {
    var post = req.post;

    var updatedpost = req.body;

    _.merge(post, updatedpost);

    post.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newpost = req.body;
    Post.create(newpost)
        .then((post) => {
            return res.json(post);
        }, (err) => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.post.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
