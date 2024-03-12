const express = require("express");
const router = express.Router();
const {logIn, logOut, register} = require('../Controller/Auth')
router.post('/signin', logIn)
router.post('/signout', logOut)
router.post('/signup', register)

module.exports = router