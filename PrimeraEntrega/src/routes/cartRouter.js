import express from 'express';
import CartController from '../controllers/CartController.js';
const router = express.Router();

router.post('/', CartController.createCart);
// router.delete('/:cid', deleteCart);
// router.get('/:cid/products', getCart);
// router.post('/:cid/products', addProductToCart);
// router.delete('/:cid/products/:pid', deleteProductFromCart);

export default router;
