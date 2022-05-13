/* MONGO DB */

const mongoose = require('mongoose');
const config = require('../config.json');

const connectDb = async () => {
  await mongoose
    .connect(config.databases.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB Connected');
    })
    .catch((err) => {
      console.log(err);
    });
};
const disconnect = async () => {
  await mongoose.disconnect();
  console.log('DB Disconnected');
};

if (config.databases.engine === 'mongodb') {
  connectDb();
}

module.exports = { disconnect };
