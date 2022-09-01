const Routes = require('koa-router');
const CartController = require('./controller/CartController');
const { verifyToken } = require('../../middlewares/authJwt');

module.exports = (app) => {
	const router = new Routes(app);
	router.prefix('/api/carts');

	router.post('/', verifyToken, CartController.setCart);
	router.delete('/:cid', verifyToken, CartController.deleteCart);
	router.get('/:cid/products', verifyToken, CartController.getCartProducts);
	router.post('/:cid/products', verifyToken, CartController.setProductToCart);
	router.delete('/:cid/products/:pid', verifyToken, CartController.deleteProductInCart);
	router.get('/:cid/confirm', verifyToken, CartController.confirmCartOrder);
	app.use(router.routes()).use(router.allowedMethods());
};
