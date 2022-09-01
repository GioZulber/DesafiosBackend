const Routes = require('koa-router');
const AuthController = require('./controller/AuthController');
const { verifyToken } = require('../../middlewares/authJwt');
module.exports = (app) => {
	const router = new Routes(app);
	router.prefix('/');
	router.post('/register', AuthController.register);
	router.post('/login', AuthController.login);
	router.get('/user', verifyToken, AuthController.getUser);
	app.use(router.routes()).use(router.allowedMethods());
};
