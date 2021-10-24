const router = require('express').Router();
const controller = require('./users.controller');

router.get('/', controller.getAll);
router.get('/:username', controller.getByUsername);
router.post('/', controller.postUser);
router.delete('/:username', controller.deleteUser);
router.put('/:username', controller.putUser);
router.patch('/:username', controller.patchUser);

module.exports = router;