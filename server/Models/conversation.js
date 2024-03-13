const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
	{
		parties: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema)