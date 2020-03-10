var lionRouter = require('express').Router();

// In-memory array for adding lions
var lions = [];

// Id for each lions
var id = 0;

var updatedId = (req, res, next) => {
    if (!req.body.id) {
        id++;
        req.body.id = id + ' ';
    }
    next();
};


lionRouter.route('/')
    .get((req, res) => {
        res.json(lions);
    }).post((req, res) => {
        id++;
        var lion = req.body;
        lion.id = id + '';
        lions.push(lion);
        res.json(lion);
    });

lionRouter.route('/:id')
    .get((req, res) => {
        res.json(req.lion || {});
    }).put((req, res) => {
        var updatedLion = req.body;
        lion = updatedLion.id;
        lions.pop(lion);
        lions.push(updatedLion);
        res.json(updatedLion);
    }).delete((req, res) => {
        lions.pop(req.lion);
        res.json('deleted');
    });


module.exports = lionRouter;
