# Nodstarter

[![starter](https://img.shields.io/static/v1?label=node&message=starter&color=blue&style=flat)](https://www.npmjs.com/package/nodstarter)
[![Nodejs](https://img.shields.io/static/v1?label=Node&message=js&color=orange&style=flat)](https://www.npmjs.com/package/nodstarter)
[![NPM](https://img.shields.io/static/v1?label=npm&message=6.14.2&color=pink&style=flat)](https://www.npmjs.com/package/nodstarter)
[![Linux](https://img.shields.io/static/v1?label=Linux&message=pass&color=green&style=flat)](https://www.npmjs.com/package/nodstarter)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://www.npmjs.com/package/nodstarter)
[![License](https://img.shields.io/static/v1?label=license&message=Apache2&color=tan&style=flat)](https://www.npmjs.com/package/nodstarter)

Nodstarter provides rapid rest APIs development, it offers preconfigured and secured routers using JWT, error middleware handler, MongoDB models, MongoDB connection and logger with APIs testing.
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

## Nodstarter uses the environment variables

Nodstarter starts searching first for the following environment variables if found them will use them if not will use the default. The default for NODE_ENV is development, NODE_PORT is 3000 and JWT 'Gambell'
You can choose NODE_ENV from one of the following options (development, production, testing)

1. NODE_ENV
2. NODE_PORT
3. JWT

## NPM Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install nodstarter
```

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
