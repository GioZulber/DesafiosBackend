const Routes = require('koa-router');
const ProductsController = require('./controller/ProductsController');
const { verifyToken, isAdmin } = require('../../middlewares/authJwt');
module.exports = (app) => {
	const router = new Routes(app);
	router.prefix('/api/products');

	router.get('/:pid?', verifyToken, ProductsController.getProducts);
	router.post('/', verifyToken, isAdmin, ProductsController.setProduct);
	router.put('/:pid?', verifyToken, isAdmin, ProductsController.updateProduct);
	router.delete('/:pid?', verifyToken, isAdmin, ProductsController.deleteProduct);
	app.use(router.routes()).use(router.allowedMethods());
};
