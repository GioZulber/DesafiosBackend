import express from 'express';
import ProductManager from '../models/ProductManager.js';

const router = express.Router();

//handlebars
// router.get('/', (req, res) => {
//   res.render('home');
// });
//handlebars
// router.get('/productos', (req, res) => {
//   let products = ProductManager.get();
//   res.render('products', { products });
// });

//Ejs
router.get('/', (req, res) => {
  let products = ProductManager.get();
  res.render('pages/index', { products });
});

//ejs
router.post('/productos', (req, res) => {
  let product = req.body;
  ProductManager.add(product);
  // res.redirect('/productos');
  res.render('pages/index', { products: ProductManager.get() });
});

export default router;
