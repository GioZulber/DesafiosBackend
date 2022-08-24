const { Router } = require('express');
const ProductController = require('./controller/productController');
const { verifyToken, isAdmin } = require('../../middlewares/authJwt');

module.exports = (app) => {
	let router = new Router();
	app.use('/api/products', router);
	// router.post('/', ProductController.setProduct);
	// router.get('/:pid?', ProductController.getProducts);
	// router.put('/:pid', ProductController.updateProduct);
	// router.delete('/:pid', ProductController.deleteProduct);
	router.post('/', [verifyToken, isAdmin], ProductController.setProduct);
	router.get('/:pid?', verifyToken, ProductController.getProducts);
	router.put('/:pid', [verifyToken, isAdmin], ProductController.updateProduct);
	router.delete('/:pid', [verifyToken, isAdmin], ProductController.deleteProduct);
};
