import express from 'express';
import ProductManager from '../models/ProductManager.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/productos', (req, res) => {
  let products = ProductManager.get();
  res.render('products', { products });
});

export default router;
