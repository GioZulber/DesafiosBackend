import CartManager from '../models/CartManager.js';
import __dirname from '../utils.js';

const cartManager = new CartManager(__dirname + '/files/cart.json');

const createCart = async (req, res) => {
  const cart = await cartManager.set();

  if (cart) {
    res.status(201).send({
      message: 'Cart created',
      cartId: cart,
    });
  } else {
    res.status(400).send({
      message: 'Bad request',
    });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.cid;
  const del = await cartManager.delete(id);
  if (del) {
    res.status(200).send({
      message: 'Cart deleted',
      cartId: id,
    });
  } else {
    res.status(400).send({
      message: 'Cant delete cart',
    });
  }
};

const getProducts = async (req, res) => {
  const id = req.params.cid;
  const products = await cartManager.getCartProducts(id);
  if (id) {
    res.status(200).send({
      message: 'Carts products found',
      cartId: id,
      product: products,
    });
  } else {
    res.status(400).send({
      message: 'Bad request',
    });
  }
};

const setProductsToCart = async (req, res) => {
  const cid = req.params.cid;
  const product = req.body;
  const cart = await cartManager.setProductsToCart(cid, product);
  if (cart) {
    res.status(200).send({
      message: 'Product added to cart',
      cartId: cid,
      product: product,
    });
  } else {
    res.status(400).send({
      message: 'Cant add product to cart',
    });
  }
};

const deleteProductsFromCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const del = await cartManager.deleteProductFromCart(cid, pid);
  if (del) {
    res.status(200).send({
      message: 'Product deleted from cart',
      cartId: cid,
      productId: pid,
      product: del,
    });
  } else {
    res.status(400).send({
      message: 'Cant delete product from cart',
    });
  }
};
export default {
  createCart,
  deleteCart,
  getProducts,
  setProductsToCart,
  deleteProductsFromCart,
};
