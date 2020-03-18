var Category = require('./model');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = (req, res, next, id) => {
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

exports.get = (req, res, next) => {
    category.find({})
        .then((categorys) => {
            logger.log(categorys);
            return res.json(categorys);
        }, (err) => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    var category = req.category;
    res.json(category);
};

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

exports.post = (req, res, next) => {
    var newcategory = req.body;
    Category.create(newcategory)
        .then((category) => {
            return res.json(category);
        }, (err) => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.category.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};
