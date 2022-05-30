const { config } = require('../config/index');
let productModel = require('./productTest.js');

let msgModel;

switch (config.database) {
  case 'mongo': {
    console.log('MongoDB');
    msgModel = require('./msgMongo');
    break;
  }
  case 'filesystem': {
    console.log('Filesystem');
    msgModel = require('./msgFiles');
    break;
  }
  default: {
    console.log('Default');
    msgModel = require('./msgFiles');
    break;
  }
}

module.exports = {
  msgModel,
  productModel,
};
