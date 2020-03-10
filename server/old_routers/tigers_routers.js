var tigerRouter = require('express').Router();

// In-memory array for adding lions
var tigers = [];

// Id for each lions
var id = 0;

tigerRouter.route('/')
    .get((req, res) => {
        res.json(tigers);
    }).post((req, res) => {
        id++;
        var lion = req.body;
        tiger.id = id + '';
        tigers.push(tiger);
        res.json(tiger);
    });

tigerRouter.route('/:id')
    .get((req, res) => {
        res.json(req.tiger || {});
    }).put((req, res) => {
        var updatedTiger = req.body;
        updatedTiger.id = lion.id;
        tigers.pop(lion);
        tigers.push(updatedTiger);
        res.json(updatedTiger);
    }).delete((req, res) => {
        tigers.pop(req.tiger);
        res.json(req.tiger);
    });

module.exports = tigerRouter;
