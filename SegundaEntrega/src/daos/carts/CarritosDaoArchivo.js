const ContenedorArchivo = require('../../containers/ContenedorArchivo');
const config = require('../../config');
class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super(config.databases.paths.carts);
  }
  getCart = async (id) => {
    try {
      let data = await this.getData();
      let cid = data.find((c) => c.id === Number(id));
      if (cid === undefined) {
        return { message: 'No existe el carrito' };
      } else {
        return cid;
      }
    } catch (error) {
      console.log(`Could not get cart: ${error}`);
    }
  };

  setCart = async () => {
    try {
      let data = await this.getData();
      let cid = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      let date = new Date();
      let cart = {
        id: cid,
        timestamp: date,
        products: [],
      };
      data.push(cart);
      let save = await this.setData(data);
      return save;
    } catch (error) {
      console.log(`Could not set cart: ${error}`);
    }
  };

  deleteCart = async (id) => {
    try {
      let data = await this.getData();
      data = data.filter((c) => c.id !== Number(id));
      let save = await this.setData(data);
      return save;
    } catch (error) {
      console.log(`Could not delete cart: ${error}`);
    }
  };
  getCartProducts = async (id) => {
    try {
      let data = await this.getData();
      if (id) {
        let cart = data.find((c) => c.id === Number(id));
        if (cart) {
          return cart.products;
        } else {
          return { message: 'No existe el carrito' };
        }
      } else {
        return data;
      }
    } catch (error) {
      console.log(`Could not get cart products: ${error}`);
    }
  };
  setProductToCart = async (cid, product) => {
    try {
      let data = await this.getData();
      let cart = data.find((c) => c.id === Number(cid));
      console.log(cart);

      let isInCart = cart.products.some(
        (prod) => prod.id === Number(product.id)
      );

      let id =
        cart.products.length > 0
          ? cart.products[cart.products.length - 1].id + 1
          : 1;
      let date = new Date();
      let newProduct = {
        id: id,
        timestamp: date,
        quantity: product.quantity || 1,
      };
      if (isInCart) {
        cart.products.forEach((prod) => {
          if (prod.id === product.id) {
            prod.quantity += product.quantity;
          }
        });
      } else {
        cart.products.push(newProduct);
      }
      let save = await this.setData(data);
      return save;
    } catch (error) {
      console.log(`Could not set products in cart: ${error}`);
    }
  };
  deleteProductFromCart = async (cid, pid) => {
    try {
      let data = await this.getData();
      let cart = data.find((c) => c.id === Number(cid));
      if (cart) {
        cart.products = cart.products.filter((p) => p.id !== Number(pid));
      } else {
        return { message: 'No existe el carrito' };
      }
      let save = await this.setData(data);
      return save;
    } catch (error) {
      console.log(`Could not delete product from cart: ${error}`);
    }
  };
}

module.exports = CarritosDaoArchivo;
