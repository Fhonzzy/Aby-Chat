const User = require('../Models/user')

const getUsers = async (req, res) => {
    try {
        const signedInId = req.user._id

        const users = await User.find({_id : {$ne: signedInId}}).select("-password")

        res.status(200).json(users)
    } catch (error) {
        console.error(error.message);
		res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getUsers
}