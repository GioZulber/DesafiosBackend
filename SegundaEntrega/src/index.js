/*MONGO DB*/

// const disconnect = require('./conections/clienteMongoDB').disconnect;
// disconnect();

/* MONGO DB*/

const express = require('express');
const config = require('./config.json');
const app = express();
const PORT = config.port;
const CartRouter = require('./routes/cartRouter.js');
const ProductRouter = require('./routes/productRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/products', (req, res, next) => {
//   if (req.method === 'GET') return next();
//   if (req.headers.admin === 'true') return next();
//   return res.status(401).send({
//     error: -1,
//     descripcion: `ruta: ${req.url} metodo: ${req.method} no autorizado`,
//   });
// });

app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
