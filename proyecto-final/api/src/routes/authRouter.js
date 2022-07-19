const express = require('express');
const AuthController = require('../components/auth/controller/AuthContoller');
const { verifyToken } = require('../middlewares/authJwt');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/user/:email', verifyToken, AuthController.getUser);
// router.get('/logout', AuthController.getLogout);

module.exports = router;
