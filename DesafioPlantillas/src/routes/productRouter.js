import express from 'express';
import ProductController from '../controllers/ProductController.js';
const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProducts);
// router.post('/products', ProductController.addProducts);

export default router;
