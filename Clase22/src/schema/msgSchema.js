const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  msg: [
    {
      author: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        nickname: { type: String, required: true },
        avatar: { type: String, required: true },
      },
      text: { type: String, required: true },
    },
  ],
});

module.exports = msgSchema;
