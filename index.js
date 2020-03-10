// Import the server
var app = require('./server/server');

// Import configuration of the server
var config = require('./server/config/config');

// Import the logger
var logger = require('./server/util/logger');

// Start the app at port in config file
app.listen(config.port);

// Log message about starting the server
logger.log('listening on http://localhost:' + config.port);
