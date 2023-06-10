require('colors');
const _ = require('lodash');
const config = require('../config');
const loggerApply = console.log.bind(console);

const logger = {
    log: (input) => {
      let args = '';
      if(input && typeof(input)==='string'){
         args = input.trim().split(" ")
        .map(function (arg) {
                arg += '';
                return arg.white;
              });
      }else {
           args = _.toArray(input)
           .map(function (arg) {
             let string = JSON.stringify(arg);
             return string.yellow;
            });
          }
        if (config.env === config.dev) {
            loggerApply.apply(console, args);
        }
    }
};

module.exports = logger;
