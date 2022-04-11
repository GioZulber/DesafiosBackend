import CartManager from '../models/CartManager.js';
import __dirname from '../utils.js';

const cartManager = new CartManager(__dirname + '/files/cart.json');

const createCart = async (req, res) => {
  const cart = await cartManager.set();
  res.status(201).send({
    message: 'Cart created',
    cart: cart,
  });
};

export default {
  createCart,
};
