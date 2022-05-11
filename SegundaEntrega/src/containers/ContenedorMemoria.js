class ContenedorMemoria {
  constructor() {
    this.data = [];
  }
  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
    return this.data;
  }
}

module.exports = ContenedorMemoria;
