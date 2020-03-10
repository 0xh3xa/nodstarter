var User = require('../api/users/userModel');
var Post = require('../api/posts/postModel');
var Category = require('../api/categories/categoryModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the database');

var users = [{
    username: 'user_1',
    password: 'test'
}, {
    username: 'user_2',
    password: 'test'
}, {
    username: 'user_3',
    password: 'test'
}, {
    username: 'user_4',
    password: 'test'
}, {
    username: 'user_5',
    password: 'test'
}];

var categories = [{
    name: 'intros'
}, {
    name: 'react'
}];
