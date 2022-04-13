import express from 'express';
import CartController from '../controllers/CartController.js';
const router = express.Router();

router.post('/', CartController.createCart);
router.delete('/:cid', CartController.deleteCart);
router.get('/:cid/products', CartController.getProducts);
router.post('/:cid/products', CartController.setProductsToCart);
router.delete('/:cid/products/:pid', CartController.deleteProductsFromCart);

export default router;
