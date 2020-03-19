require('colors');
const _ = require('lodash');
const config = require('../config');
const loggerApply = console.log.bind(console);

const logger = {
    log: (text) => {
        var args = text.trim().split(" ")
            .map(function (arg) {
                if (typeof arg === 'object') {
                    var string = JSON.stringify(arg);
                    return string.magenta;
                } else {
                    arg += '';
                    return arg.white;
                }
            });

        if (config.env === config.dev) {
            loggerApply.apply(console, args);
        }
    }
};

module.exports = logger;
