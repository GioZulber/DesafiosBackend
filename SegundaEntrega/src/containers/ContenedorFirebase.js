const { admin } = require('../conections/clienteFirebase');

class ContenedorFirebase {
  constructor(collection) {
    this.db = admin.firestore();
    this.query = this.db.collection(collection);
  }

  getData = async () => {
    const data = await this.query.get();
    return data.docs.map((doc) => doc.data());
  };
}

module.exports = ContenedorFirebase;
