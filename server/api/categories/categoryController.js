// Import categoryModel
var Category = require('./categoryModel');

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
    Category.findById(id)
        .then((category) => {
            if (!category) {
                next(new Error('No category with that id'));
            } else {
                req.category = category;
                next();
            }
        }, (err) => {
            next(err);
        });
};

// GET all categorys
exports.get = (req, res, next) => {
    category.find({})
        .then((categorys) => {
            logger.log(categorys);
            return res.json(categorys);
        }, (err) => {
            next(err);
        });
};

// GET one, after execute params add json to the response
exports.getOne = (req, res, next) => {
    var category = req.category;
    res.json(category);
};

// Update request for the category
exports.put = (req, res, next) => {
    var category = req.category;

    var updatedcategory = req.body;

    _.merge(category, updatedcategory);

    category.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

// Create new category
exports.post = (req, res, next) => {

    // get category object from body
    var newcategory = req.body;

    // Insert into Mongo and return the category with JSON format
    Category.create(newcategory)
        .then((category) => {
            return res.json(category);
        }, (err) => {
            next(err);
        });
};

// Delete the category by id
exports.delete = (req, res, next) => {
    req.category.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
