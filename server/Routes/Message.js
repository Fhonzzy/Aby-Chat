const express = require("express");
const router = express.Router();
const { sendMessage } = require("../Controller/message");
const authorize = require("../Middleware/authorize");

router.post("/send/:id", authorize, sendMessage);

module.exports = router;
