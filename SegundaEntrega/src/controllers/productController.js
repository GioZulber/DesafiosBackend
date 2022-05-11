const ProductosDao = require('../daos/index.js').daoProducts;

const ProductModel = new ProductosDao();

const getProducts = async (req, res) => {
  const id = req.params.pid;
  const products = await ProductModel.getProducts(id);
  res.status(200).send({
    message: 'Products encontraods',
    products: products,
  });
};

const setProduct = async (req, res) => {
  const product = req.body;
  const newProduct = await ProductModel.setProduct(product);
  res.status(200).send({
    message: 'Producto agregado',
    newProduct: newProduct,
  });
};

const updateProduct = async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const updatedProduct = await ProductModel.updateProduct(id, product);
  if (id) {
    res.status(200).send({
      message: 'Producto actualizado',
      updatedProduct: updatedProduct,
    });
  } else {
    res.status(400).send({
      message: 'El id del producto no puede ser nulo',
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.pid;
  const deletedProduct = await ProductModel.deleteProduct(id);
  if (id) {
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
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
