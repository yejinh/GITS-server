const router = require('express').Router();
const { ensureLoggedIn } = require('./middlewares/authentication');
const usersController = require('./controllers/users.controller');

router.get('/', ensureLoggedIn, usersController.getLoggedInUser);

module.exports = router;
