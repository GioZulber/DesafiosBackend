import express from 'express';
import __dirname from './utils.js';
import ProductRouter from './routes/productRouter.js';
import CartRouter from './routes/cartRouter.js';
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const admin = true;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', (req, res, next) => {
  if (req.method === 'GET') return next();
  if (req.headers.admin === 'true') return next();
  return res.status(401).send({
    error: -1,
    descripcion: `ruta: ${req.url} metodo: ${req.method} no autorizado`,
  });
});
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
