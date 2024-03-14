const Conversation = require("../Models/conversation");
const Message = require("../Models/message");

const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: recieverId } = req.params;
		const senderId = req.user._id;

		//Checks if a conversation exists
		let conversation = await Conversation.findOne({
			parties: { $all: [senderId, recieverId] },
		});

		//If it doesen't, we create one
		if (!conversation) {
			conversation = await Conversation.create({
				parties: [senderId, recieverId],
			});
		}

		//creates message
		const newMessage = new Message({
			senderId,
			recieverId,
			message,
		});

		//Push message it to the conversation
		conversation.messages.push(newMessage._id);

		// Saves conversation & message
		await conversation.save();
		await newMessage.save();

		res.status(201).json({ newMessage });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: error.message });
	}
};

const getMessage = async (req, res) => {
	try {
		const { id: userToChat } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			parties: { $all: [senderId, userToChat] },
		}).populate("messages");

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: error.message });
	}
};

module.exports = { sendMessage, getMessage };
