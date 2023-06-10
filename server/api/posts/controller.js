const Post = require('./model');
const _ = require('lodash');
const logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
    Post.findById(id)
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
   let post = req.post;
    res.json(post);
};

exports.put = (req, res, next) => {
   let post = req.post;

   let updatedpost = req.body;

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
   let newpost = req.body;
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
