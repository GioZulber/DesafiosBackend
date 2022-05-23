const express = require('express');
const ViewController = require('../controllers/ViewsController');
const router = express.Router();

router.get('/', ViewController.getHome);
router.get('/products-test', ViewController.getProducts);
router.get('/chat', ViewController.getChat);

module.exports = router;
