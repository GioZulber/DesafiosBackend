import express from 'express';
import ContainerProducts from './container/products.js';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const products = new ContainerProducts();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products/list', (req, res) => {
  products.getAllProducts();
  if (!products.getAllProducts.length === 0) {
    res.send({ products });
  } else {
    res.status(400).send({ error: 'No products loaded' });
  }
});

app.get('/api/products/list/:id', (req, res) => {
  let id = req.params.id;
  let product = products.getProductId(id);
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ error: 'Product not found' });
  }
});

app.post('/api/products/add', (req, res) => {
  let { title, price, thumbnail } = req.body;
  let added = products.addProducts({ title, price, thumbnail });
  let id = products.getAllProducts().length;
  res.send({ message: 'Added Product', product: products.getProductId(id) });
});
