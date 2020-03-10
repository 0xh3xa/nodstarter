// Import Router from express
var router = require('express').Router();

// Set user router to /users
router.use('/users', require('./users/userRouter'));

// Set category router to /categories
router.use('/categories', require('./categories/categoryRouter'));

// Set poast router to /posts
router.use('/posts', require('./posts/postRouter'));

// Export router
module.exports = router;
