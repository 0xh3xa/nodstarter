// Import postModel
var Post = require('./postModel');

// Import lodash
var _ = require('lodash');

// Import logger
var logger = require('../../util/logger');

// Middleware for all /id in the Url
// Find category and attach to the request
// Then move to the next which means the method of the request
exports.params = (req, res, next, id) => {

    // Check the Mongo DB by this id
    // If find attach it to the request and move to next middleware
    // If not assign error and move to error middleware
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

// GET all posts
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

// GET one, after execute params add json to the response
exports.getOne = (req, res, next) => {
    var post = req.post;
    res.json(post);
};

// Update request for the category
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

// Create new post
exports.post = (req, res, next) => {

    // get post object from body
    var newpost = req.body;

    // Insert into Mongo and return the post with JSON format
    Post.create(newpost)
        .then((post) => {
            return res.json(post);
        }, (err) => {
            next(err);
        });
};

// Delete the post by id
exports.delete = (req, res, next) => {
    req.post.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
