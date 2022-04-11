import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.post('/', ProductController.setProduct);
router.get('/:pid?', ProductController.getProducts);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

export default router;
