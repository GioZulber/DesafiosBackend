const config = require('../config');

let daoProducts;
let daoCarts;
switch (config.databases.engine) {
  case 'mongodb': {
    console.log('Conectando a MongoDB');
    daoProducts = require('./products/ProductosDaoMongoDb');
    daoCarts = require('./carts/CarritosDaoMongoDb');
    break;
  }
  case 'memory': {
    console.log('memory');

    daoProducts = require('./products/ProductosDaoMem');
    daoCarts = require('./carts/CarritosDaoMem');
    break;
  }
  case 'firebase': {
    console.log('firebase');
    daoProducts = require('./products/ProductosDaoFirebase');
    daoCarts = require('./carts/CarritosDaoFirebase');
    break;
  }
  case 'archivo': {
    console.log('archivo');
    daoProducts = require('./products/ProductosDaoArchivo');
    daoCarts = require('./carts/CarritosDaoArchivo');
    break;
  }
  default: {
    console.log('archivo');
    daoProducts = require('./products/ProductosDaoArchivo');
    daoCarts = require('./carts/CarritosDaoArchivo');
    break;
  }
}

module.exports = {
  daoProducts,
  daoCarts,
};
