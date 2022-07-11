const express = require('express');
// const { isLogin } = require('../middlewares/login');

const ProductController = require('../components/products/controller/productController');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const router = express.Router();

// router.post('/', isLogin, ProductController.setProduct);
// router.get('/:pid?', isLogin, ProductController.getProducts);
// router.put('/:pid', isLogin, ProductController.updateProduct);
// router.delete('/:pid', isLogin, ProductController.deleteProduct);
router.post('/', [verifyToken, isAdmin], ProductController.setProduct);
router.get('/:pid?', verifyToken, ProductController.getProducts);
router.put('/:pid', [verifyToken, isAdmin], ProductController.updateProduct);
router.delete('/:pid', [verifyToken, isAdmin], verifyToken, ProductController.deleteProduct);

module.exports = router;
