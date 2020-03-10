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
app.get('/lions', (req, res, next) => {
    next(new Error('unable to fetch lions'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.log('There is an error!');
    console.log(err);
    res.status(500).json('Server internal error');
});

// RUN the server on port 3001
app.listen(3001);

// Print console message that the server is current run on port 3001
console.log('server is running on port 3001');
