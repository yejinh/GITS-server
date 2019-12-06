const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');

router.use('/authenticate', auth);
router.use('/users', users);


module.exports = router;
