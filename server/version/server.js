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

// Routers
// GET list all lions
app.get('/lions', (req, res) => {
    res.json(lions);
});

// GET get lion by id
app.get('/lions/:id', (req, res) => {
    var lion = _.find(lions, {
        id: req.params.id
    });
    console.log(lions);
    res.json(lion || {});
});

// POST adding new lion
app.post('/lions', (req, res) => {
    id++;
    var lion = req.body;
    lion.id = id + '';
    lions.push(lion);
    res.json(lion);
});

// PUT update lion
app.put('/lions/:id', (req, res) => {
    var lion = _.find(lions, {
        id: req.params.id
    });
    var updatedLion = req.body;
    updatedLion.id = lion.id;
    lions.pop(lion);
    lions.push(updatedLion);
    res.json(updatedLion);
});

// DELETE delete lion by id
app.delete('/lions/:id', (req, res) => {
    var lion = _.find(lions, {
        id: req.params.id
    });

    if (!lions[lion]) {
        res.send();
    } else {
        lions.pop(lion);
        res.json(liion);
    }
});

// RUN the server on port 3000
app.listen(3000);

// Print console message that the server is current run on port 3000
console.log('server is running on port 3000');
