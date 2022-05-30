/* MONGO DB */
const mongoose = require('mongoose');
const { config } = require('./index.js');

const connectDb = async () => {
  await mongoose
    .connect(config.database_url, {
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

if (config.database === 'mongo') {
  connectDb();
}

process.on('uncaughtException', (error) => {
  console.log(error);
  mongoose.disconnect();
});

module.exports = { disconnect };
