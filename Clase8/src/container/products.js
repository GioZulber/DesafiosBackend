export default class ContainerProducts {
  constructor() {
    this.products = [];
  }

  getAllProducts = () => {
    console.log(this.products);
    return this.products;
  };

  getProductId = (id) => {
    let product = this.products.find(
      (prod) => parseInt(prod.id) === parseInt(id)
    );
    return product;
  };
  addProducts = (obj) => {
    if (this.products.length === 0) {
      this.products = [{ ...obj, id: 1 }];
    } else {
      obj.id = this.products.length + 1;
      this.products.push(obj);
    }
  };
}
