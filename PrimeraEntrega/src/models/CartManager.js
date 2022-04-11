import fs from 'fs';
class CartManager {
  constructor(file) {
    this.cart = file;
  }
  set = async () => {
    if (fs.existsSync(this.cart)) {
      let data = JSON.parse(await fs.promises.readFile(this.cart, 'utf-8'));
      let cart = {
        id: data[data.length - 1].id + 1,
        timestamp: new Date().toISOString().slice(0, 10),
        products: [
          {
            id: 1,
            quantity: 2,
          },
        ],
      };
      data.push(cart);
      await fs.promises.writeFile(this.cart, JSON.stringify(obj), 'utf-8');
      return cart.id;
    } else {
      let obj = [
        {
          id: 1,
          timestamp: new Date().toISOString().slice(0, 10),
          products: [
            {
              id: 1,
              quantity: 2,
            },
          ],
        },
      ];
      await fs.promises.writeFile(this.cart, JSON.stringify(obj), 'utf-8');
    }
  };
}

export default CartManager;
