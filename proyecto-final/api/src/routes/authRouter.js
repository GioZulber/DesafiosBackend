const express = require('express');
const { isLogin, isNotLogin } = require('../middlewares/login');
const AuthController = require('../components/login/controller/AuthContoller');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// router.get('/logout', AuthController.getLogout);

module.exports = router;
