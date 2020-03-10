// Import express lib
var express = require('express');

// Import api for Rest APIs
var api = require('./api/api');

// Import auth for secure Rest APIs
var auth = require('./auth/routers');

// Import err middleware
var err = require('./middleware/err');

var logger = require('./util/logger');

// Start the express
var app = express();

// Import app middleware and pass pass to set:
// To set morgan middlware
// Bodyparser middleware for encoding the URL and JSON
require('./middleware/appMiddleware')(app);

// Set the route Middlware
app.use('/api', api);


// Set the auth route Middlware
app.use('/auth', auth);

// Set the Global error handling Middlware
app.use((err, req, res, next) => {
    // if error thrown from jwt validation check
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
        return;
    }

    logger.log('{' + err.stack + '}');
    res.status(500).send('Oops');
});

// Set the error Middlware
//app.use(err);

// Export the app for testing
module.exports = app;
