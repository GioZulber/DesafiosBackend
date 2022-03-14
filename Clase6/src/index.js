import fs from 'fs';

class Archivo {
  constructor(filesName) {
    this.filesName = filesName;
  }
  async leer() {
    try {
      if (fs.existsSync(this.filesName)) {
        let data = await fs.promises.readFile(this.filesName, 'utf-8');
        console.log(data);
      } else {
        console.log([]);
      }
    } catch (error) {
      console.log(`Can't read file ${error}`);
    }
  }
  async guardar(newProduct) {
    try {
      if (fs.existsSync(this.filesName)) {
        let data = JSON.parse(
          await fs.promises.readFile(this.filesName, 'utf-8')
        );
        newProduct.id = data.length + 1;
        data.push(newProduct);
        await fs.promises.writeFile(
          this.filesName,
          JSON.stringify(data, null, '\t')
        );
      } else {
        let obj = [{ ...newProduct, id: 1 }];
        await fs.promises.writeFile(
          this.filesName,
          JSON.stringify(obj, null, '\t')
        );
      }
    } catch (error) {
      console.log(`Can't push file ${error}`);
    }
  }
  async borrar() {
    try {
      if (fs.existsSync(this.filesName)) {
        await fs.promises.unlink(this.filesName);
      } else {
        console.log(`No existe ${this.filesName}`);
      }
    } catch (error) {
      console.log(`Can0't detele file, error: ${error}`);
    }
  }
}

const firstProduct = {
  title: 'Bicicleta',
  price: Math.floor(Math.random() * 1000 + 200),
  thumbnail:
    'https://yuhmak.vteximg.com.br/arquivos/ids/156469/E0000011069-BICICLETA-ENRIQUE-R29-VERTIGO-21V-LL-D-P-035.png?v=637354425148900000',
};
const secondProduct = {
  title: 'Monopatin',
  price: Math.floor(Math.random() * 1000 + 200),
  thumbnail:
    'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/245/791/products/718e032a-238d-42be-9830-d470019ae09a-78dd77bf4cb874088c16232991142539-640-0.jpg',
};
const thirdProudct = {
  title: 'Pelota',
  price: Math.floor(Math.random() * 1000 + 200),
  thumbnail:
    'https://assets.adidas.com/images/w_600,f_auto,q_auto/55ea2a5f168f4c609d51a9f1011a500d_9366/Pelota_Oficial_Partidos_Argentina_19_(UNISEX)_Blanco_DY2520_01_standard.jpg',
};

const archivo = new Archivo('../files/products.txt');

/*Para poder crear el archivo, descomente todo excepto archivo.borrar*/

archivo.leer();

const guardar = async () => {
  try {
    await archivo.guardar(firstProduct);
    await archivo.guardar(secondProduct);
    await archivo.guardar(thirdProudct);
  } catch (error) {
    console.log(error);
  }
};

guardar();

//Si ya existe un products.txt descomente archivo.borrar() y comente lo anterior a esto

// archivo.borrar();
