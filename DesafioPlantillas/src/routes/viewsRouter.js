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
  res.render('pages/index.ejs');
});

router.get('/products', (req, res) => {
  let products = ProductManager.get();
  res.render('pages/table.ejs', { products });
});

//ejs
router.post('/', (req, res) => {
  let product = req.body;
  ProductManager.add(product);
  console.log(ProductManager.get());
  res.status(201).render('pages/index.ejs');
});

export default router;
