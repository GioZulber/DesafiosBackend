import CartManager from '../models/CartManager.js';
import __dirname from '../utils.js';

const cartManager = new CartManager(__dirname + '/files/cart.json');

const createCart = async (req, res) => {
  const cart = await cartManager.set();
  console.log(cart);
  res.status(201).send({
    message: 'Cart created',
    cartId: cart,
  });
};

const deleteCart = async (req, res) => {
  const id = req.params.cid;
  const del = await cartManager.delete(id);
  res.status(200).send({
    message: 'Cart deleted',
    cartId: id,
  });
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
  // const  = product;
  if (cid) {
    const cart = await cartManager.setProductsToCart(cid, product);
    res.status(200).send({
      message: 'Product added to cart',
      cartId: cid,
      product: product,
    });
  } else {
    res.status(400).send({
      message: 'Bad request',
    });
  }
};

const deleteProductsFromCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const del = await cartManager.deleteProductFromCart(cid, pid);
  res.status(200).send({
    message: 'Product deleted from cart',
    cartId: cid,
    productId: pid,
    product: del,
  });
};
export default {
  createCart,
  deleteCart,
  getProducts,
  setProductsToCart,
  deleteProductsFromCart,
};
