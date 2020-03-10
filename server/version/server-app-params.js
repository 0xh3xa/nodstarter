// import express framework
var express = require('express');

// import body-parser for JSON like Jackson in Java
var bodyParser = require('body-parser');

// import lodash for extension operation
var _ = require("lodash");

// define our app
var app = express();

// Express will use this folder as the root with GET to '/'
app.use(express.static('client'));

// By default express doesn't know how to handle JSON
// We use this middleware to deal with JSON like Jackson in Java world
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

// Routers
// GET list all lions
app.get('/lions', (req, res) => {
    res.json(lions);
});

// POST adding new lion
app.post('/lions', (req, res) => {
    id++;
    var lion = req.body;
    lion.id = id + '';
    lions.push(lion);
    res.json(lion);
});

// Middleware for finding lion
app.param('id', (req, res, next, id) => {
    var lion = _.find(lions, {
        id: req.params.id
    });

    if (lion) {
        req.lion = lion;
        next();
    } else {
        res.send();
    }
});

// GET get lion by id
app.get('/lions/:id', (req, res) => {
    res.json(req.lion || {});
});

// POST adding new lion
app.post('/lions', updatedId, (req, res) => {
    var lion = req.body;
    lions.push(lion);
    res.json(lion);
});

// PUT update lion
app.put('/lions/:id', (req, res) => {
    var updatedLion = req.body;
    updatedLion.id = lion.id;
    lions.pop(lion);
    lions.push(updatedLion);
    res.json(updatedLion);
});

// DELETE delete lion by id
app.delete('/lions/:id', (req, res) => {
    lions.pop(req.lion);
    res.json(req.liion);
});

// Error handler middleware
app.use('id', (err, req, res, next) => {
    if (err) {
        res.status(500).send(err);
    }
});

// RUN the server on port 3030
app.listen(3030);

// Print console message that the server is current run on port 3030
console.log('server is running on port 3030');
