const express = require("express");
const router = express.Router();
const { sendMessage, getMessage } = require("../Controller/message");
const authorize = require("../Middleware/authorize");

router.get("/:id", authorize, getMessage);
router.post("/send/:id", authorize, sendMessage);

module.exports = router;
