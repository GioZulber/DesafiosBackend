const express = require('express');
const { isLogin, isNotLogin } = require('../middlewares/login');
const LoginController = require('../controllers/LoginController');
const router = express.Router();

router.get('/logout', isLogin, LoginController.getLogout);

router.post('/register', LoginController.register);
router.post('/login', LoginController.login);

// router.post(
// 	'/register',
// 	passport.authenticate('register', { failureRedirect: 'error', successRedirect: 'home' })
// );
// router.post(
// 	'/login',
// 	passport.authenticate('login', { failureRedirect: 'error', successRedirect: '/' })
// );

module.exports = router;
