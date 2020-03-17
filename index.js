var app = require('./server');
var config = require('./server/config');
var logger = require('./server/util/logger');

app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);
