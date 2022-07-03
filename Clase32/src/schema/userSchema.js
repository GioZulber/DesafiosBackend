const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	// id: { type: Number, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
});

module.exports = userSchema;
