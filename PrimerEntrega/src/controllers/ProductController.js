import ProductsManager from '../models/ProductManager.js';
import __dirname from '../utils.js';

const productManager = new ProductsManager(__dirname + '/files/products.json');

const getProducts = async (req, res) => {
  const id = req.params.pid;
  const products = await productManager.get(id);
  console.log(products);
  if (products) {
    res.status(200).send({
      message: 'Products found',
      products: products,
    });
  } else {
    res.status(400).send({
      message: 'Product not found',
    });
  }
};

const setProduct = async (req, res) => {
  const product = req.body;
  let { title, description, price, stock } = product;
  if (title === '' || description === '' || price === 0 || stock === '') {
    res.status(400).send({ message: 'Bad request' });
  } else {
    await productManager.set(product);
    res.status(201).send({
      message: 'Product created',
      product: product,
    });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const update = await productManager.update(product, id);
  res.status(200).send({
    message: 'Product updated',
    product: product,
  });
};

const deleteProduct = async (req, res) => {
  const id = req.params.pid;
  await productManager.delete(id);
  res.status(200).send({
    message: 'Product deleted',
    id: id,
  });
};

export default {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
