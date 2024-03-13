const User = require("../Models/user");
const bcyrpt = require("bcryptjs");
const generateTokenAndSetCookies = require("../utils/generateToken");

const register = async (req, res) => {
	try {
		let { fullname, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ msg: "Password doesn't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}

		const salt = await bcyrpt.genSalt(10);
		const hashedPassword = await bcyrpt.hash(password, salt);

		const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const createUser = new User({
			fullname,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
		});

		if (createUser) {
			generateTokenAndSetCookies(createUser._id, res);
			await createUser.save();

			return res.status(200).json({
				fullname: createUser.fullname,
				username: createUser.username,
				gender: createUser.gender,
				profilePic: createUser.profilePic,
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: error.message });
	}
};

const logIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcyrpt.compare(
			password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ msg: "Wrong Username or Password" });
		}

		generateTokenAndSetCookies(user._id, res);

		return res.status(200).json({
			id: user._id,
			fullname: user.fullname,
			username: user.username,
			gender: user.gender,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: error.message });
	}
};

const logOut = async (req, res) => {
	try {
		res.clearCookie("token");
		return res.status(200).json({ msg: "Logged out successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: error.message });
	}
};

module.exports = {
	register,
	logIn,
	logOut,
};
