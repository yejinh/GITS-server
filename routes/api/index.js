const router = require('express').Router();
const auth = require('./auth');

router.use('/authenticate', auth);

module.exports = router;
