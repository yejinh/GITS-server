const router = require('express').Router();
const { ensureLoggedIn } = require('./middlewares/authentication');
const { uploadS3 } = require('./middlewares/uploadS3');
const usersController = require('./controllers/users.controller');

router.get('/:user_id', ensureLoggedIn, usersController.getLoggedInUser);
router.get('/:user_id/stories', ensureLoggedIn, usersController.getMyStories);
router.post('/:user_id/stories', ensureLoggedIn, uploadS3, usersController.create);

module.exports = router;
