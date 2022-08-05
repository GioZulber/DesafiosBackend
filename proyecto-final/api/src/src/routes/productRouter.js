const express = require('express');
const ProductController = require('../components/products/controller/productController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const router = express.Router();

router.post('/', [verifyToken, isAdmin], ProductController.setProduct);
router.get('/:pid?', verifyToken, ProductController.getProducts);
router.put('/:pid', [verifyToken, isAdmin], ProductController.updateProduct);
router.delete('/:pid', [verifyToken, isAdmin], ProductController.deleteProduct);

module.exports = router;
