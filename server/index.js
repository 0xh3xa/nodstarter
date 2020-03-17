var express = require('express');
var api = require('./api');
var auth = require('./auth/routers');
var err = require('./middleware/err');
var logger = require('./util/logger');

var app = express();
require('./middleware')(app);

app.use('/api', api);

app.use('/auth', auth);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
        return;
    }

    logger.log('{' + err.stack + '}');
    res.status(500).send('Oops');
});

// Optional to se the error Middlware
//app.use(err);

module.exports = app;
