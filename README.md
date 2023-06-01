# Nodstarter

<p align="center">
      <img src="https://github.com/ahmadmoaw/nodstarter-replica/blob/master/asset/logo_1.png" alt="nodstarter" width="150" height="150"/>
</p>
<br/>

<div align="center">

[![Build Status][build-img]][nodestarter-url]
[![Dependency Status][depend-img]][nodestarter-url]
[![Linux][linux-img]][nodestarter-url]
[![Mac][macos-img]][nodestarter-url]
[![Known Vulnerabilities](https://snyk.io/test/github/dwyl/hapi-auth-jwt2/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dwyl/hapi-auth-jwt2?targetFile=package.json)
[![License][license-img]][nodestarter-url]

</div>

starter application for Node.js to provide rapid Restful APIs development, pre-configured, secured routers, services, and models.

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Initial Example](#initial-example)
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

Nodstarter is a starter application for Node.js to provide rapid Restful APIs development, pre-configured, secured routers, services, and models using different libraries.

This project aims to help writing the secure rest APIs quickly and provide a skeleton to the node.js project to minimize the configuration and avoid starting from scratch.

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

## Initial code

Nodstarter contains 3 models with the relationship to `users`, `posts` and `categories`, each of them contains `router`, `controller`, and `model`

- Router: Already defined routers you can change to what you want
- Controller: CRUD operation for the models
- Model: Mongo representation for three models with the relationship:

  * User to Posts one-to-many
  * Posts to Categories many-to-many

So this is the basis for a node.js project you can start with any of them and change the router to your routes, and use the controller.

For the model also you can update them and the relationship is already this you can copy-and-paste.

In future plans ability to use a command line to create a router, controller, model like Ruby-on-Rails.

## Project structure

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
    │   ├── production.js
    │   └── testing.js
    ├── index.js
    ├── middleware
    │   ├── err.js
    │   └── index.js
    └── util
        ├── createRouter.js
        └── logger.js
```

## AUTH Code snippet

This is the configuration to the JWT token to the user

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

1. Swagger file for the existing APIs
2. Add tests for the existing APIs
3. Ability to make nodstarter a command line to install models, controllers and routers, etc.

## New Ideas

If you have new ideas about the project please describe what you want to do and changes using an issue.

## Contributing 

See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

## License summary

See <a href="https://github.com/ahmadmoaw/nodstarter-replica/blob/master/.github/LICENSE"/>MIT License</a>

## NPM statistics

[![NPM](https://nodei.co/npm/nodstarter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodstarter/)

## Project based

<a href="https://github.com/ahmadmoaw/nodstarter"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd9%2FNode.js_logo.svg%2F1920px-Node.js_logo.svg.png&f=1&nofb=1" alt="nodejs" width="200" height="110"/></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/ahmadmoaw/nodstarter"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcamo.githubusercontent.com%2Ffc61dcbdb7a6e49d3adecc12194b24ab20dfa25b%2F68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67&f=1&nofb=1" alt="nodejs" width="250" height="110"/></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/ahmadmoaw/nodstarter"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/768px-MongoDB_Logo.svg.png?20190626143224" alt="nodejs" width="250" height="110"/></a>

[demo-url]: https://github.com/ahmadmoaw/nodstarter/raw/master/asset/demo.gif
[build-img]: https://img.shields.io/static/v1?label=build&message=passing&color=light-green&style=flat
[depend-img]: https://img.shields.io/static/v1?label=dependencies&message=passing&color=light-green&style=flat
[nodestarter-url]: https://www.npmjs.com/package/nodstarter
[starter-img]: https://img.shields.io/static/v1?label=nod&message=starter&color=blue&style=flat
[starter-url]: [nodestarter-url]
[nodejs-img]: https://img.shields.io/static/v1?label=nodejs&message=12.0.0&color=orange&style=flat
[nodejs-url]: [nodestarter-url]
[npm-img]: https://img.shields.io/static/v1?label=npm&message=6.0.0&color=pink&style=flat
[npm-url]: [nodestarter-url]
[npmjs-url]: https://www.npmjs.com/
[linux-img]: https://img.shields.io/static/v1?label=linux&message=passing&color=green&style=flat
[macos-img]: https://img.shields.io/static/v1?label=macos&message=passing&color=green&style=flat
[linux-url]: [nodestarter-url]
[license-img]: https://img.shields.io/github/license/ahmadmoaw/nodstarter
[license-url]: [nodestarter-url]
