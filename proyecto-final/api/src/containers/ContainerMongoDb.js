const mongoose = require('mongoose');

class ContainerMongo {
  constructor(schema, collection) {
    this.schema = schema;
    this.collection = collection;
    this.model = mongoose.model(collection, schema);
  }
  getData = async () => {
    try {
      let data = await this.model.find({});
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ContainerMongo;
