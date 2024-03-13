const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const authorize = async (req, res, next) => {
	try {
        const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ msg: "Unauthorized => No token provided" });
	}
    
	const decode = jwt.verify(token, process.env.JWT_SECRET);

	if (!decode) {
		return res.status(401).json({ msg: "Unauthorized => Invalid Token" });
	}

	const user = await User.findOne({_id: decode.userId}).select("-password");

	if (!user) {
		return res.status(401).json({ msg: "User not found" });
	}
    
    req.user = user
    next()
    } catch (error) {
        console.log(error.message);
		res.status(500).json({ msg: error.message });
    }
};

module.exports = authorize
