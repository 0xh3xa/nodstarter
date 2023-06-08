let app = require('./server');
let config = require('./server/config');
let logger = require('./server/util/logger');

app.listen(config.port);

logger.log('listening on http://localhost:' + config.port);
