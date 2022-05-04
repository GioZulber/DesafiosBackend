import express from 'express';
import ProductManager from '../models/ProductManager.js';

const getAllProducts = (req, res) => {
  let products = ProductManager.get();
  res.send(products);
};

const addProducts = (req, res) => {
  let product = req.body;
  console.log(product);
  ProductManager.set(product);
  res.send({
    status: 'success',
    message: 'Producto agregado',
  });
};

export default {
  getAllProducts,
  addProducts,
};
