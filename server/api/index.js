const router = require('express').Router();

router.use('/users', require('./users/router'));
router.use('/categories', require('./categories/router'));
router.use('/posts', require('./posts/router'));

module.exports = router;
