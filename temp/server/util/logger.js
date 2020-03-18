require('colors');
var _ = require('lodash');
var config = require('../config');
var loggerApply = console.log.bind(console);

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

        if (config.env === config.dev) {
            loggerApply.apply(console, args);
        }
    }
};

module.exports = logger;
