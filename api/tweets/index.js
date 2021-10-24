const router = require('express').Router();
const controller = require('./tweets.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.postTweet);
router.delete('/:id', controller.deleteTweet);
router.put('/:id', controller.putTweet);
router.patch('/:id', controller.patchTweet);

module.exports = router;