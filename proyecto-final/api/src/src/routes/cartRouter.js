const express = require('express');
// const { isLogin } = require('../middlewares/login');
const CartController = require('../components/cart/controller/cartController');
const { verifyToken } = require('../middlewares/authJwt');
const router = express.Router();

// router.post('/', isLogin, CartController.setCart);
// router.delete('/:cid', isLogin, CartController.deleteCart);
// router.get('/:cid/products', isLogin, CartController.getCartProducts);
// router.post('/:cid/products', isLogin, CartController.setProductToCart);
// router.delete('/:cid/products/:pid', isLogin, CartController.deleteProductFromCart);

router.get('/:uid', verifyToken, CartController.getCarts);
router.post('/', verifyToken, CartController.setCart);
router.delete('/:cid', verifyToken, CartController.deleteCart);
router.get('/:cid/products', verifyToken, CartController.getCartProducts);
router.post('/:cid/products', verifyToken, CartController.setProductToCart);
router.delete('/:cid/products/:pid', verifyToken, CartController.deleteProductFromCart);
router.get('/:cid/confirm', verifyToken, CartController.confirmCartOrder);

module.exports = router;
