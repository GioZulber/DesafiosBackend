const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router();

router.post('/', ProductController.setProduct);
router.get('/:pid?', ProductController.getProducts);
router.put('/:pid', ProductController.updateProduct);
router.delete('/:pid', ProductController.deleteProduct);

module.exports = router;
