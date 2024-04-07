const express = require('express')
const { registerUser, loginUser, LogoutUser } = require('../controllers/user.controller')

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', LogoutUser)

module.exports = router