const ContenedorFirebase = require('../../containers/ContenedorFirebase');

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('productos');
  }
  getProducts = async (id) => {
    try {
      const products = await this.getData();
      if (id) {
        let res = await this.query.where('id', '==', Number(id)).get();
        return res.docs[0].data();
      }
      return products;
    } catch (error) {
      console.log(`Could not get products: ${error}`);
    }
  };
  setProduct = async (product) => {
    try {
      let lastId = await this.query.orderBy('id', 'desc').limit(1).get();
      let id = lastId.docs.length > 0 ? lastId.docs[0].data().id + 1 : 1;
      const newProduct = {
        id,
        ...product,
      };
      await this.query.add(newProduct);
    } catch (error) {
      console.log(`Could not set product: ${error}`);
    }
  };
  updateProduct = async (pid, product) => {
    try {
      let res = await this.query.where('id', '==', Number(pid)).get();
      let doc = res.docs[0];
      if (doc) {
        await doc.ref.update(product);
      } else {
        return { message: 'Product not found' };
      }
    } catch (error) {
      console.log(`Could not update product: ${error}`);
    }
  };
  deleteProduct = async (pid) => {
    try {
      let doc = await this.query.where('id', '==', Number(pid)).get();
      if (doc.empty) return { message: 'Producto no encontrado' };
      await doc.docs[0].ref.delete();
    } catch (error) {
      console.log(`Could not delete product: ${error}`);
    }
  };
}

module.exports = ProductosDaoFirebase;
