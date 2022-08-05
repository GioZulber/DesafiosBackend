const express = require('express');
const ViewController = require('../controllers/ViewsController');

const router = express.Router();

router.get('/', ViewController.getHome);
router.get('/errorLogin', ViewController.getErrorLogin);
router.get('/errorRegister', ViewController.getErrorRegister);

module.exports = router;
