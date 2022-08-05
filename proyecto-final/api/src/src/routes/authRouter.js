const express = require('express');
const AuthController = require('../components/auth/controller/AuthContoller');
const { verifyToken } = require('../middlewares/authJwt');
const { upload } = require('../utils/multer');
const router = express.Router();

router.post('/register', upload.single('avatar'), AuthController.register);
router.post('/login', AuthController.login);
router.get('/user', verifyToken, AuthController.getUser);
// router.get('/logout', AuthController.getLogout);

module.exports = router;
