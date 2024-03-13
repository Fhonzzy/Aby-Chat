const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	gender: {
		type: String,
		required: true,
		enum: ["male", "female"],
	},
	profilePic: {
		type: String,
		default: "",
	},
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
