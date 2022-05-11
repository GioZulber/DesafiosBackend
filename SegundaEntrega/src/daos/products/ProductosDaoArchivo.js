const ContentedorArchivo = require('../../containers/ContenedorArchivo');
const config = require('../../config');

class ProductDaoArchivo extends ContentedorArchivo {
  constructor() {
    super(config.databases.paths.products);
  }

  getProducts = async (id) => {
    try {
      const products = await this.getData();
      if (id) {
        return products.find((product) => product.id === Number(id));
      }
      return products;
    } catch (error) {
      console.log(`Could not get products: ${error}`);
    }
  };

  setProduct = async (product) => {
    try {
      const products = await this.getData();

      let { title, description, code, thumbnail, price, stock } = product;
      if (
        title === undefined ||
        description === undefined ||
        code === undefined ||
        thumbnail === undefined ||
        price === undefined ||
        stock === undefined
      ) {
        return console.log('Datos incompletos');
      }
      let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      let date = new Date();
      const newProduct = {
        id,
        timestamp: date,
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
      };
      products.push(newProduct);
      let save = await this.setData(products);
      return save;
    } catch (error) {
      console.log(`Could not set product: ${error}`);
    }
  };

  updateProduct = async (pid, product) => {
    try {
      const products = await this.getData();
      const pUpdate = products.find((p) => Number(p.id) === Number(pid));
      if (pUpdate) {
        let { title, description, code, thumbnail, price, stock } = product;

        if (
          title === undefined ||
          description === undefined ||
          code === undefined ||
          thumbnail === undefined ||
          price === undefined ||
          stock === undefined
        ) {
          return console.log('Datos incompletos');
        }
        let date = new Date();
        pUpdate.id = Number(pid);
        pUpdate.title = title;
        pUpdate.timestamp = date;
        pUpdate.description = description;
        pUpdate.code = code;
        pUpdate.thumbnail = thumbnail;
        pUpdate.price = price;
        pUpdate.stock = stock;
        let save = await this.setData(products);
        return save;
      } else {
        return console.log('Producto no encontrado');
      }
    } catch (error) {
      console.log(`Could not update product: ${error}`);
    }
  };
  deleteProduct = async (pid) => {
    try {
      let products = await this.getData();
      if (pid) {
        products = products.filter((p) => p.id !== Number(pid));
      } else {
        return { message: 'Producto no encontrado' };
      }
      let save = await this.setData(products);
      return save;
    } catch (error) {
      console.log(`Could not delete product: ${error}`);
    }
  };
}

module.exports = ProductDaoArchivo;
