const express = require('express')
const router = express.Router()
const authorize = require('../Middleware/authorize')
const {getUsers} = require('../Controller/user')

router.get('/', authorize, getUsers)

module.exports = router