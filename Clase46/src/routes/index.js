let authRoutes = require('../components/auth/authRoutes');
let cartRoutes = require('../components/cart/cartRoutes');
let productsRoutes = require('../components/products/productsRoutes');

module.exports = (app) => {
	authRoutes(app);
	cartRoutes(app);
	productsRoutes(app);
};
