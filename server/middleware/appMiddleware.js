// Import morgan
var morgan = require('morgan');

// Import body parser
var bodyParser = require('body-parser');

var cors = require('cors');

var override = require('method-override');

// Export app after set morgan and body parser
module.exports = (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
};
