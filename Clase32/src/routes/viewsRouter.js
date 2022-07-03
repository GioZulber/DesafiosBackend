const express = require('express');
let gzip = require('compression');
const ViewController = require('../controllers/ViewsController');
const { isLogin, isNotLogin } = require('../middlewares/login');
const router = express.Router();

router.get('/', isLogin, ViewController.getHome);
router.get('/info', ViewController.getInfo);
router.get('/infozip', gzip(), ViewController.getInfo);
router.get('/login', isNotLogin, ViewController.getLogin);
router.get('/register', isNotLogin, ViewController.getRegister);
router.get('/products-test', isLogin, ViewController.getProducts);
router.get('/errorLogin', isNotLogin, ViewController.getErrorLogin);
router.get('/errorRegister', isNotLogin, ViewController.getErrorRegister);

module.exports = router;
