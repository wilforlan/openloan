var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
const UserValidator = require('../validators/user.validator');

router.post('/register', UserValidator.createUser, UserController.Register);
router.post('/login', UserController.Login);

router.put('/:id', UserController.UpdateProfile);

module.exports = router;
