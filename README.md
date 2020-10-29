# Nodstarter

<p align="center">
      <img src="https://github.com/ahmadmoawad/nodstarter/raw/master/asset/logo_1.png" alt="nodstarter" width="150" height="150"/>
</p>
<br/>

<div align="center">

[![Build Status][build-img]][nodestarter-url]
[![Linux][linux-img]][nodestarter-url]
[![Mac][macos-img]][nodestarter-url]
[![Known Vulnerabilities][vul-img]][vul-url]


[![License][license-img]][nodestarter-url]

</div>

starter application for Node.js to provide rapid Restful APIs development, pre-configured, secured routers, services and models.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Project structure](#project-structure)
* [Code example](#code-example)
* [Sign in API call example](#sign-in-api-call-example)
* [Environment variables](#environment-variables)
* [Setup](#setup)
* [Before running](#before-running)
* [Demo](#demo)
* [New Ideas](#new-ideas)
* [Future plans](#future-plans)
* [Contributing](#contributing)
* [License summary](#license-summary)
* [NPM statistics](#npm-statistics)
* [Project based](#project-based)

## General info

Nodstarter is a starter application for Node.js to provide rapid Restful APIs development, pre-configured, secured routers, services and models using different libraries.

This project aims to help writing the rest APIs backend quickly and to be like <a href="https://start.spring.io/">Spring Initializr</a> to minimize the configuration for developing Node.js apps.

## Technologies

01. Node.js
02. Express framework
03. MongoDB
04. Mongoose ORM
05. Lodash
06. Morgan middleware
07. Body-parser middleware
08. Method-override
09. Bcrypt
10. Express-jwt
11. Jsonwebtoken
12. Cors middleware
13. Nodemon
14. Testing libraries: Supertest, Chai and Mocha

## Project structure

The project contains two folder server and test

``` 
├── index.js
├── package.json
├── scripts
│   └── post_install.js
└── server
    ├── api
    │   ├── categories
    │   │   ├── controller.js
    │   │   ├── model.js
    │   │   └── router.js
    │   ├── index.js
    │   ├── posts
    │   │   ├── controller.js
    │   │   ├── model.js
    │   │   └── router.js
    │   └── users
    │       ├── controller.js
    │       ├── model.js
    │       └── router.js
    ├── auth
    │   ├── controller.js
    │   ├── index.js
    │   └── routers.js
    ├── config
    │   ├── development.js
    │   ├── index.js
    │   ├── prodduction.js
    │   └── testing.js
    ├── index.js
    ├── middleware
    │   ├── err.js
    │   └── index.js
    └── util
        ├── createRouter.js
        └── logger.js
```

## Code example

#### JWT configuration

``` js
const expressJwt = require('express-jwt');
const config = require('../config');
const logger = require('../util/logger');
const jwt = require('jsonwebtoken');
const checkToken = expressJwt({
    secret: config.secrets.jwt
});
const User = require('../api/users/model');
exports.decodeToken = () => {
    return (req, res, next) => {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        checkToken(req, res, next);
    };
};

exports.getFreshUser = () => {
    return (req, res, next) => {
        User.findById(req.user._id)
            .then((user) => {
                if (!user) {
                    res.status(400).send('Unanuthorized');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.verifyUser = () => {
    return (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            res.status(400).send('You need a username and password');
            return;
        }

        User.findOne({
                username: username
            })
            .then((user) => {
                logger.log('the selected user from DB: ' + user);
                if (!user) {
                    logger.log('No user with the given username');
                    res.status(401).send('Invalid username or password');
                } else if (!user.authenticate(password)) {
                    logger.log('Invalid password');
                    res.status(401).send('Invalid username or password');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.signToken = (id) => {
    logger.log("id is: " + id);
    return jwt.sign({
        _id: id
    }, config.secrets.jwt, {
        expiresIn: config.expireTime
    });
};
```

## Sign in API call example


``` sh
curl --header "Content-Type: application/json" --request POST --data '{"username":"test_user_4","password":"12345"}' http://localhost:3000/auth/signin
```

, `Output`

``` 
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTY2NjQwODYzMGE0NDE3MThiMjNhMzgiLCJpYXQiOjE1ODQ2Mzc4NDIsImV4cCI6MTU4NDY1MjI0Mn0.MODWP86ebc8XOMjDGyuvNCWWoKnQhpZpl81ynFGExG8"}
```

## Environment variables

Nodstarter starts searching first for the following environment variables if found them will use them if not will use the default. The default values for `NODE_ENV` is development, `NODE_PORT` is `3000` and `JWT` is `Gambell`
You can choose the environment for the `NODE_ENV` variable from one of the following profiles (`development`, `production`, `testing`)

01. `NODE_ENV`
02. `NODE_PORT`
03. `JWT`

## Setup

1. Init with [npm][npmjs-url]:

``` sh
$ npm init
```

2. Install:

``` sh
$ npm install nodstarter
```

3. Start:

``` sh
$ npm start
```

, or use in one-line command:

``` sh
$ npm init; npm install nodstarter; npm start
```

### Before running

Please make sure that the `MongoDB daemon` is up and running

* Ubuntu

```
systemctl start mongodb
```

* Macos

```
brew services run mongodb-community
```

## Demo

![Demo][demo-url]

## Running Tests (future plan)

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

``` sh
$ npm install && npm test
```

## Future plans

1. Add tests for the APIs
2. Option to add libraries dynamically
3. Ability to choose what libraries want and how many rest APIs, models, Database engine and back-bone tests for rest APIs.

## New Ideas

If you have new ideas about the project please discuss the change you wish to make via an <a href="mailto:ahmadmoawad2@yahoo.com">email</a>, or any other method with the owners of this repository before making a change. 

## Contributing 

See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## License summary

See <a href="https://github.com/ahmadmoawad/nodstarter/blob/master/.github/LICENSE"/>MIT License</a>

## NPM statistics

[![NPM](https://nodei.co/npm/nodstarter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodstarter/)

## Project based

<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd9%2FNode.js_logo.svg%2F1920px-Node.js_logo.svg.png&f=1&nofb=1" alt="nodejs" width="200" height="110"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcamo.githubusercontent.com%2Ffc61dcbdb7a6e49d3adecc12194b24ab20dfa25b%2F68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67&f=1&nofb=1" alt="nodejs" width="200" height="110"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" alt="nodejs" width="120" height="110"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F4%2F45%2FMongoDB-Logo.svg%2F320px-MongoDB-Logo.svg.png&f=1&nofb=1" alt="nodejs" width="200" height="110"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmongodb-tools.com%2Fimg%2Fmongoose.png&f=1&nofb=1" alt="nodejs" width="200" height="110"/>

[vul-img]: https://img.shields.io/snyk/vulnerabilities/github/ahmadmoawad/nodstarter?style=for-the-badge
[vul-url]: https://snyk.io/test/github/ahmadmoawad/nodstarter
[demo-url]: https://github.com/ahmadmoawad/nodstarter/raw/master/asset/demo.gif
[build-img]: https://img.shields.io/github/workflow/status/ahmadmoawad/nodstarter/Node.js%20CI/master?style=for-the-badge&logo=Travis%20CI
[depend-img]: https://img.shields.io/static/v1?label=dependencies&message=passing&color=light-green&style=flathttps://img.shields.io/david/ahmadmoawad/nodstarter
[nodestarter-url]: https://www.npmjs.com/package/nodstarter
[starter-img]: https://img.shields.io/static/v1?label=nod&message=starter&color=blue&style=for-the-badge
[starter-url]: [nodestarter-url]
[nodejs-img]: https://img.shields.io/static/v1?label=nodejs&message=12.0.0&color=orange&style=for-the-badge
[nodejs-url]: [nodestarter-url]
[npm-img]: https://img.shields.io/static/v1?label=npm&message=6.0.0&color=pink&style=for-the-badge
[npm-url]: [nodestarter-url]
[npmjs-url]: https://www.npmjs.com/
[linux-img]: https://img.shields.io/static/v1?label=linux&message=passing&color=light-green&style=for-the-badge&logo=linux
[macos-img]: https://img.shields.io/static/v1?label=macos&message=passing&color=light-green&style=for-the-badge&logo=apple
[linux-url]: [nodestarter-url]
[license-img]: https://img.shields.io/github/license/ahmadmoawad/nodstarter?color=pink&style=for-the-badge
[license-url]: [nodestarter-url]
