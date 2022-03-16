import fs from 'fs';
import express from 'express';

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log('Listening on PORT 8080');
});

let counterItems = 0;
let counterItemRandom = 0;

//Traigo todos los produtos de products.txt
const getProducts = async () => {
  try {
    const products = JSON.parse(
      await fs.promises.readFile('./files/products.txt', 'utf-8')
    );
    return products;
  } catch (error) {
    console.log(`Can't read file products.txt, ${error}`);
  }
};
//Traer todos los productos
app.get('/items', async (req, res) => {
  const products = await getProducts();
  const obj = { items: products, quantity: products.length };
  res.send(obj);
  return ++counterItems;
});

//Traer un producto ramdon del array
app.get('/item-random', async (req, res) => {
  const products = await getProducts();
  const random = Math.floor(Math.random() * products.length);
  const randomProduct = products[random];
  const obj = { item: randomProduct };
  res.send(obj);
  return ++counterItemRandom;
});

app.get('/visitas', (req, res) => {
  res.send({
    visitas: {
      items: counterItems,
      itemRandom: counterItemRandom,
    },
  });
});
