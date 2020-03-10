// Logger util wrapping console.log

// Import color lib
require('colors');

// Import lodash
var _ = require('lodash');

// Import config
var config = require('../config/config');

// Bind console to loggerApply
var loggerApply = console.log.bind(console);

// Define logger object contains log function
// That takes the text and check if object insepect it
// If not make the color blue and print it
var logger = {
    log: (text) => {
        var args = _.toArray(text)
            .map(function (arg) {
                if (typeof arg === 'object') {
                    var string = JSON.stringify(arg);
                    return string.magenta;
                } else {
                    arg += '';
                    return arg.blue;
                }
            });

        // Add args to console
        if (config.env === config.dev) {
            loggerApply.apply(console, args);
        }
    }
};

// export logger
module.exports = logger;
