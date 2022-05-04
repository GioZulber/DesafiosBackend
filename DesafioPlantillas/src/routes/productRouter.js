import express from 'express';
import ProductController from '../controllers/ProductController.js';
const router = express.Router();

router.get('/productos', ProductController.getAllProducts);
router.post('/', ProductController.addProducts);

export default router;
