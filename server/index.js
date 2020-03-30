const express = require('express');
const api = require('./api');
const auth = require('./auth/routers');
const logger = require('./util/logger');

const app = express();
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

module.exports = app;
