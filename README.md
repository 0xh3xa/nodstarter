## Nodstarter

<p align="center">
  <img src="https://github.com/0xh3xa/nodstarter/blob/master/asset/logo_1.png" alt="nodstarter" width="150" height="150"/>
</p>
<br/>

<div>
      <p>
            Nodstarter is a starter application for Node.js designed to facilitate rapid RESTful API development. It provides pre-configured, secured routers, services, and models to streamline the creation of secure and scalable applications.
      </p>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/nodstarter">
    <img src="https://img.shields.io/static/v1?label=build&message=passing&color=light-green&style=flat" alt="Build Status" />
  </a>
  <a href="https://www.npmjs.com/package/nodstarter">
    <img src="https://img.shields.io/static/v1?label=dependencies&message=passing&color=light-green&style=flat" alt="Dependency Status" />
  </a>
  <a href="https://www.npmjs.com/package/nodstarter">
    <img src="https://img.shields.io/static/v1?label=linux&message=passing&color=green&style=flat" alt="Linux" />
  </a>
  <a href="https://www.npmjs.com/package/nodstarter">
    <img src="https://img.shields.io/static/v1?label=macos&message=passing&color=green&style=flat" alt="Mac" />
  </a>
  <a href="https://snyk.io/test/github/dwyl/hapi-auth-jwt2?targetFile=package.json">
    <img src="https://snyk.io/test/github/dwyl/hapi-auth-jwt2/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <a href="https://www.npmjs.com/package/nodstarter">
    <img src="https://img.shields.io/github/license/0xh3xa/nodstarter" alt="License" />
  </a>
</div>

## Table of Contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Initial Code](#initial-code)
- [Project Structure](#project-structure)
- [Code Example](#code-example)
- [Sign In API Call Example](#sign-in-api-call-example)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Before Running](#before-running)
- [Demo](#demo)
- [New Ideas](#new-ideas)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License Summary](#license-summary)
- [NPM Statistics](#npm-statistics)
- [Project Based](#project-based)

## General Info

Nodstarter provides a framework for developing secure RESTful APIs quickly. It includes pre-configured routers, services, and models, allowing developers to focus on writing business logic rather than setup and configuration.

## Technologies

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ORM for MongoDB.
- **Lodash**: Utility library for JavaScript.
- **Morgan**: HTTP request logger middleware.
- **Body-parser**: Middleware for parsing request bodies.
- **Method-override**: Middleware to allow HTTP verbs such as PUT or DELETE.
- **Bcrypt**: Library for hashing passwords.
- **Express-jwt**: Middleware for JWT authentication.
- **Jsonwebtoken**: Library for signing and verifying JSON Web Tokens.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **Nodemon**: Utility for auto-reloading the server during development.
- **Testing Libraries**: Supertest, Chai, and Mocha for testing.

## Initial Code

Nodstarter includes models for `users`, `posts`, and `categories`, with predefined relationships:

- **User to Posts**: One-to-many.
- **Posts to Categories**: Many-to-many.

These components are organized into routers, controllers, and models to provide a clear structure for API development.

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

## Code example

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

See <a href="https://github.com/0xh3xa/nodstarter/blob/develop/LICENSE"/>License</a>

## NPM statistics

[![NPM](https://nodei.co/npm/nodstarter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodstarter/)

## Project based

<a href="https://github.com/0xh3xa/nodstarter"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd9%2FNode.js_logo.svg%2F1920px-Node.js_logo.svg.png&f=1&nofb=1" alt="nodejs" width="200" height="110"/></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/0xh3xa/nodstarter"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcamo.githubusercontent.com%2Ffc61dcbdb7a6e49d3adecc12194b24ab20dfa25b%2F68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67&f=1&nofb=1" alt="nodejs" width="250" height="110"/></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/0xh3xa/nodstarter"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/768px-MongoDB_Logo.svg.png?20190626143224" alt="nodejs" width="250" height="110"/></a>

[demo-url]: https://github.com/0xh3xa/nodstarter/raw/master/asset/demo.gif
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
[license-img]: https://img.shields.io/github/license/0xh3xa/nodstarter
[license-url]: [nodestarter-url]
