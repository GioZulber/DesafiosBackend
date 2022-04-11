import fs from 'fs';

class ProductsManager {
  constructor(file) {
    this.products = file;
  }

  set = async (product) => {
    try {
      if (fs.existsSync(this.products)) {
        let data = JSON.parse(
          await fs.promises.readFile(this.products, 'utf-8')
        );

        product.code = Math.floor(Math.random() * 999 + 1);
        product.timestap = new Date();
        if (data.length === 0) {
          product.id = 1;
        } else {
          product.id = data[data.length - 1].id + 1;
        }

        data.push(product);
        await fs.promises.writeFile(
          this.products,
          JSON.stringify(data, null, '\t')
        );
      } else {
        let obj = [
          {
            ...product,
            code: Math.floor(Math.random() * 999 + 1),
            timestap: new Date(),
            id: 1,
          },
        ];
        await fs.promises.writeFile(
          this.products,
          JSON.stringify(obj, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Can't push file ${error}`);
    }
  };

  get = async (id) => {
    try {
      if (fs.existsSync(this.products)) {
        let data = JSON.parse(
          await fs.promises.readFile(this.products, 'utf-8')
        );
        if (id) {
          let prod = data.filter(
            (product) => parseInt(product.id) === parseInt(id)
          );
          return prod;
        } else {
          return data;
        }
      }
    } catch (error) {
      console.log(`Cant get file ${error}`);
    }
  };

  update = async (product) => {
    try {
      if (fs.existsSync(this.products)) {
        let data = JSON.parse(
          await fs.promises.readFile(this.products, 'utf-8')
        );
        let index = data.findIndex((product) => product.id === product.id);
        data[index] = {
          ...product,
          code: data[index].code,
          timestap: data[index].timestap,
          id: data[index].id,
        };

        await fs.promises.writeFile(
          this.products,
          JSON.stringify(data, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Can't update file ${error}`);
    }
  };

  delete = async (id) => {
    try {
      if (fs.existsSync(this.products)) {
        let data = JSON.parse(
          await fs.promises.readFile(this.products, 'utf-8')
        );
        data = data.filter((product) => parseInt(product.id) !== parseInt(id));
        console.log(data);
        await fs.promises.writeFile(
          this.products,
          JSON.stringify(data, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Can't delete file ${error}`);
    }
  };
}

export default ProductsManager;
