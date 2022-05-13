const ContenedorFirebase = require('../../containers/ContenedorFirebase');

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
  getCart = async (id) => {
    try {
      if (id) {
        return await this.query.where('id', '==', Number(id)).get();
      } else {
        return { message: 'No se encontro el carrito' };
      }
    } catch (error) {
      console.log(`Could not get carts: ${error}`);
    }
  };
  setCart = async () => {
    try {
      let lastId = await this.query.orderBy('id', 'desc').limit(1).get();
      let id = lastId.docs.length > 0 ? lastId.docs[0].data().id + 1 : 1;

      const newCart = {
        id,
        timestamp: new Date(),
        products: [],
      };

      await this.query.add(newCart);
    } catch (error) {
      console.log(`Could not set cart: ${error}`);
    }
  };
  deleteCart = async (id) => {
    try {
      let data = await this.getCart(id);
      if (data.empty) return { message: 'Carrito no encontrado' };
      await data.docs[0].ref.delete();
    } catch (error) {
      console.log(`Could not delete cart: ${error}`);
    }
  };
  getCartProducts = async (id) => {
    try {
      let data = await this.getCart(id);
      if (data.empty) return { message: 'Carrito no encontrado' };
      return data.docs[0].data().products;
    } catch (error) {
      console.log(`Could not get cart products: ${error}`);
    }
  };
  setProductToCart = async (cid, product) => {
    try {
      let data = await this.getCart(cid);

      if (data.docs[0] === undefined) {
        return 'Carro inexistente';
      } else {
        let doc = data.docs[0];
        let products = doc.data().products;
        let productExists = products.find((p) => p.id === product.id);
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        if (productExists) {
          productExists.quantity += product.quantity;
        } else {
          const newProduct = {
            id: product.id ? product.id : id,
            timestamp: new Date(),
            quantity: product.quantity || 1,
          };

          products.push(newProduct);
        }
        await doc.ref.update({ products });
      }
    } catch (error) {
      console.log(`Could not set cart: ${error}`);
    }
  };
  deleteProductFromCart = async (cid, pid) => {
    try {
      let data = await this.getCart(cid);

      if (data.empty) return { message: 'Carrito no encontrado' };

      let doc = data.docs[0];
      let products = doc.data().products;
      if (products.length === 0) return { message: 'Carrito vacio' };

      let product = products.find((p) => p.id === Number(pid));
      if (product) {
        products = products.filter((p) => p.id !== Number(pid));
        await doc.ref.update({ products });
      } else {
        return { message: 'Producto no encontrado' };
      }
    } catch (error) {
      console.log(`Could not delete product from cart: ${error}`);
    }
  };
}

module.exports = CarritosDaoFirebase;
