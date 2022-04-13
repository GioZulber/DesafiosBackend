import fs from 'fs';
class CartManager {
  constructor(file) {
    this.cart = file;
  }
  set = async () => {
    try {
      if (fs.existsSync(this.cart)) {
        let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));
        console.log(data.length);
        let cart = {
          timestamp: new Date(),
          products: [],
        };
        if (data.length === 0) {
          cart.id = 1;
        } else {
          cart.id = data[data.length - 1].id + 1;
        }

        data.push(cart);
        await fs.promises.writeFile(
          this.cart,
          JSON.stringify(data, null, '\t')
        );
        return cart.id;
      } else {
        let array = [
          {
            id: 1,
            timestamp: new Date(),
            products: [],
          },
        ];
        await fs.promises.writeFile(
          this.cart,
          JSON.stringify(array, null, '\t')
        );
        return array[0].id;
      }
    } catch (error) {
      console.log(`Can't push file ${error}`);
    }
  };

  delete = async (id) => {
    try {
      if (fs.existsSync(this.cart)) {
        let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));
        data = data.filter((cart) => parseInt(cart.id) !== parseInt(id));
        await fs.promises.writeFile(
          this.cart,
          JSON.stringify(data, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Can't delete file ${error}`);
    }
  };

  getCartProducts = async (id) => {
    try {
      if (fs.existsSync(this.cart)) {
        let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));
        if (id) {
          let prod = data.filter((cart) => parseInt(cart.id) === parseInt(id));
          prod = prod[0].products;
          return prod;
        } else {
          return data;
        }
      }
    } catch (error) {
      console.log(`Cant get file ${error}`);
    }
  };

  setProductsToCart = async (cid, product) => {
    try {
      if (fs.existsSync(this.cart)) {
        let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));

        let cart = data.filter((cart) => parseInt(cart.id) === parseInt(cid));
        cart = cart[0];

        let isInCart = cart.products.some(
          (prod) => parseInt(prod.id) === parseInt(product.id)
        );
        console.log(product.id);
        console.log(isInCart);
        if (isInCart) {
          cart.products.forEach((prod) => {
            if (prod.id === product.id) {
              prod.quantity += product.quantity;
            }
          });
        } else {
          cart.products.push(product);
        }

        data = data.map((cart) => {
          if (cart.id === cid) {
            cart.products.push(product);
          }
          return cart;
        });
        await fs.promises.writeFile(
          this.cart,
          JSON.stringify(data, null, '\t')
        );
      }
    } catch (error) {}
  };

  deleteProductFromCart = async (cid, pid) => {
    try {
      if (fs.existsSync(this.cart)) {
        let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));

        let cart = data.filter((cart) => parseInt(cart.id) === parseInt(cid));
        cart = cart[0];

        cart.products = cart.products.filter(
          (prod) => parseInt(prod.id) !== parseInt(pid)
        );

        data = data.map((cart) => {
          if (cart.id === cid) {
            cart.products = cart.products.filter(
              (prod) => parseInt(prod.id) !== parseInt(pid)
            );
          }
          return cart;
        });
        await fs.promises.writeFile(
          this.cart,
          JSON.stringify(data, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Cant delete file ${error}`);
    }
  };
}

export default CartManager;
