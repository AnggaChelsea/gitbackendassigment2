const router = require('express').Router();
const userController = require('../controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser);

module.exports = router;