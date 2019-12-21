const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const stories = require('./stories');

router.use('/authenticate', auth);
router.use('/users', users);
router.use('/stories', stories);


module.exports = router;
