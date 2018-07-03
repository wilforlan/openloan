var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
const UserValidator = require('../validators/user.validator');
var JWT_Verify = require('../middlewares/jwt');

router.post('/register',UserController.Register);
router.post('/login', UserController.Login);
router.use(JWT_Verify.verifyToken);
router.put('/:id', UserController.UpdateProfile);

module.exports = router;
