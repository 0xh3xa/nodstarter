// Import lodash
var _ = require('lodash');

// Set config object consists of:
// 1- Dev development environment
// 2- test testing environment
// 3- Prod production environment
// 4- Port
// Expire time for JWT token
var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.NODE_PORT || 3000,

    // 10 days in minutes
    expireTime: 24 * 60 * 10,
    secrets: {
        jwt: process.env.JWT || 'gumball'
    }
};

// Check if NODE_ENV is exist and use it
// If not exist use development as default
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// Set config env equals to NODE_ENV
config.env = process.env.NODE_ENV;

var envConfig;

try {
    // Import the environment files: development, testing, production
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (e) {
    envConfig = {};
}

// merge the properties from envConfig into config and export
module.exports = _.merge(config, envConfig);
