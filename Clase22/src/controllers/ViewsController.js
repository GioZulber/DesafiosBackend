const ProductModel = require('../models/index').productModel;
const MsgModel = require('../models/index').msgModel;

let productModel = new ProductModel();

const getHome = async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    console.log(error);
  }
};

const getProducts = (req, res) => {
  try {
    let products = productModel.getProducts(10);
    res.render('products', { products: products });
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (req, res) => {
  try {
    res.render('chat');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHome,
  getProducts,
  getChat,
};
