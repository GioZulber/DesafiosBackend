const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();

router.post('/', CartController.setCart);
router.delete('/:cid', CartController.deleteCart);
router.get('/:cid/products', CartController.getCartProducts);
router.post('/:cid/products', CartController.setProductToCart);
router.delete('/:cid/products/:pid', CartController.deleteProductFromCart);

module.exports = router;
