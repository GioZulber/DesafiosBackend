let faker = require('faker');
faker.locale = 'es';

class ProductTest {
  constructor() {}
  getProducts = (qty) => {
    let products = [];
    for (let i = 0; i < qty; i++) {
      let product = {
        id: i,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl(),
      };
      products.push(product);
    }
    return products;
  };
}

module.exports = ProductTest;
