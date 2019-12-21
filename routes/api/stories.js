const router = require('express').Router();
const { ensureLoggedIn } = require('./middlewares/authentication');
const storiesController = require('./controllers/stories.controller');

// router.post('/:user_id', ensureLoggedIn, storiesController.create);

module.exports = router;
