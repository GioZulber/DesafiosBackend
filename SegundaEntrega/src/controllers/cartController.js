const CartsDao = require('../daos/index.js').daoCarts;

const CartsModel = new CartsDao();

const getCarts = async (req, res) => {
  const id = req.params.cid;
  const carts = await CartsModel.getCarts(id);
  res.status(200).send({
    message: 'Carts encontraods',
    carts: carts,
  });
};

const setCart = async (req, res) => {
  const cart = req.body;
  const newCart = await CartsModel.setCart(cart);
  res.status(200).send({
    message: 'Cart agregado',
    newCart: newCart,
  });
};

const deleteCart = async (req, res) => {
  const id = req.params.cid;
  const deletedCart = await CartsModel.deleteCart(id);
  if (id) {
    res.status(200).send({
      message: 'Cart eliminado',
      deletedCart: deletedCart,
    });
  } else {
    res.status(400).send({
      message: 'El id del cart no puede ser nulo',
    });
  }
};
const getCartProducts = async (req, res) => {
  const id = req.params.cid;
  const productsCart = await CartsModel.getCartProducts(id);
  if (id) {
    res.status(200).send({
      message: 'Productos en el carrito',
      products: productsCart,
    });
  } else {
    res.status(400).send({
      message: 'El id del cart no puede ser nulo',
    });
  }
};

const setProductToCart = async (req, res) => {
  const id = req.params.cid;
  const product = req.body;
  const newProduct = await CartsModel.setProductToCart(id, product);
  if (id) {
    res.status(200).send({
      message: 'Producto agregado',
      newProduct: newProduct,
    });
  } else {
    res.status(400).send({
      message: 'El id del producto no puede ser nulo',
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const deletedProduct = await CartsModel.deleteProductFromCart(cid, pid);
  if (cid && pid) {
    res.status(200).send({
      message: 'Producto eliminado',
      deletedProduct: deletedProduct,
    });
  } else {
    res.status(400).send({
      message: 'El id del producto no puede ser nulo',
    });
  }
};

module.exports = {
  getCarts,
  setCart,
  deleteCart,
  getCartProducts,
  setProductToCart,
  deleteProductFromCart,
};
