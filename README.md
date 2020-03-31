# Nodstarter

[![starter][starter-img]][nodestarter-url]
[![Nodejs][nodejs-img]][nodestarter-url]
[![NPM][npm-img]][nodestarter-url]
[![Linux][Linux-img]][nodestarter-url]
[![Open Source Love][Open-Source-img]][nodestarter-url]
[![License][License-img]][nodestarter-url]

Nodstarter is starter application to provide rapid rest APIs development, it offers pre-configured and secured routers using JWT, error middleware handler, MongoDB models, MongoDB connection and logger with APIs testing.
This project aims to help writing the rest APIs backend quickly.

## Technologies and libraries used:
1. Node.js
2. Express framework
3. Mongoose ORM
4. MongoDB
5. Lodash
6. Morgan middleware
7. Body parser
8. Method-override
9. bcrypt
10. express-jwt
11. jsonwebtoken
12. cors
13. nodemon
14. Testing libraries: Supertest, Chai and Mocha

## Project structure
The project contains two folder server and test

```
server/
 └── index.js
 └── config
          └── index.js
          └── development.js
          └── production.js
          └── testing.js
 └── auth
        └── index.js
        └── controller.js
        └── routers.js
 └──api
      └── Users
               └── router.js
               └── controller.js
               └── model.js
      └── Posts
               └── router.js
               └── controller.js
               └── model.js
      └── Category
                 └── router.js
                 └── controller.js
                 └── model.js
 └──middleware
             └── index.js
             └── err.js
 └──util
        └── createRouter.js
        └── logger.js
 └── package.json
```

#### Code in auth/index.js
```js
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

#### Calling sign in

```sh
curl --header "Content-Type: application/json" --request POST --data '{"username":"test_user_4","password":"12345"}' http://localhost:3000/auth/signin
```
, `output`

```
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTY2NjQwODYzMGE0NDE3MThiMjNhMzgiLCJpYXQiOjE1ODQ2Mzc4NDIsImV4cCI6MTU4NDY1MjI0Mn0.MODWP86ebc8XOMjDGyuvNCWWoKnQhpZpl81ynFGExG8"}
```

## Nodstarter uses the environment variables

Nodstarter starts searching first for the following environment variables if found them will use them if not will use the default. The default values for `NODE_ENV` is development, `NODE_PORT` is 3000 and `JWT` is Gambell
You can choose NODE_ENV from one of the following options (development, production, testing)

1. NODE_ENV
2. NODE_PORT
3. JWT

## Install

1. Init with [NPM](https://www.npmjs.com/):

```sh
$ npm init
```

2. Install:

```sh
$ npm install nodstarter
```

3. Start:

```sh
$ npm start
```

, or use in one-line:

```sh
$ npm init; npm install nodstarter; npm start
```

## Before you run
Please make sure that the `MongoDB daemon` is up and running

## How to use

![Demo](https://github.com/ahmadmoawad/nodstarter/raw/develop/asset/demo.gif)


## Running Tests (future plan)

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```


## Project intent
Nodstarter project aims to be like <a href="https://start.spring.io/">Spring Initializr</a> to minimize the configuration for developing Node.js apps.

## Have a new idea
This project welcomes new ideas, you can reach me at this <a href="mailto:ahmadmoawad2@yahoo.com">email</a>

## Future plans
- Add API test
- Option to add libraries dynamically
- The programmer can choose what libraries want and how many rest APIs, models, Database engine and back-bone tests for rest APIs.


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

### When you are contributing
Please comment the `postinstall` in `package.json` before you start development

## License Summary

You can copy and paste the Apache 2.0 license summary below.

```
Copyright 2020 by Nodstarter

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
[nodestarter-url]: https://www.npmjs.com/package/nodstarter
[starter-img]: https://img.shields.io/static/v1?label=node&message=starter&color=blue&style=flat
[starter-url]: [nodestarter-url]
[nodejs-img]: https://img.shields.io/static/v1?label=Nodejs&message=12.0.0&color=orange&style=flat
[nodejs-url]: [nodestarter-url]
[npm-img]: https://img.shields.io/static/v1?label=npm&message=6.0.0&color=pink&style=flat
[npm-url]: [nodestarter-url]
[Linux-img]: https://img.shields.io/static/v1?label=Linux&message=pass&color=green&style=flat
[Linux-url]: [nodestarter-url]
[Open-Source-img]: https://badges.frapsoft.com/os/v1/open-source.svg?v=103
[Open-Source-url]: [nodestarter-url]
[License-img]: https://img.shields.io/static/v1?label=license&message=Apache2&color=tan&style=flat
[License-url]: [nodestarter-url]
