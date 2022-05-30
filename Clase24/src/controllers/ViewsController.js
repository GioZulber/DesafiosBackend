const ProductModel = require('../models/index').productModel;

let productModel = new ProductModel();

const getLogin = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.log(error);
  }
};

const postLogin = async (req, res) => {
  try {
    if (req.body) {
      let username = req.body;
      req.session.user = username;
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
};

const getHome = async (req, res) => {
  try {
    if (req.session.user) {
      const data = {
        user: req.session.user.name,
      };
      res.render('home', { data: data });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
  }
};

const getProducts = (req, res) => {
  try {
    console.log('entro a products');
    console.log(req.session);
    if (req.session.user) {
      let data = {
        user: req.session.user.name,
      };
      let products = productModel.getProducts(10);
      res.render('products', { products: products, data: data });
    }
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (req, res) => {
  try {
    if (req.session.user) {
      console.log('session iniciada');
      console.log(req.session.user);
      let data = {
        author: req.session.user,
        user: req.session.user.name,
      };
      res.render('chat', { data: data });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
  }
};
const getLogout = async (req, res) => {
  try {
    console.log('entro a logout');
    console.log(req.session);
    const user = req.session.user.name;
    const data = {
      user: user,
    };
    req.session.destroy();
    res.render('logout', { data: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHome,
  getProducts,
  getChat,
  getLogin,
  postLogin,
  getLogout,
};
