const express = require('express');
const ViewController = require('../controllers/ViewsController');
const router = express.Router();

router.get('/', ViewController.getHome);
router.get('/login', ViewController.getLogin);
router.post('/login', ViewController.postLogin);
router.get('/products-test', ViewController.getProducts);
router.get('/chat', ViewController.getChat);
router.get('/logout', ViewController.getLogout);

module.exports = router;
