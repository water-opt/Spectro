const express = require('express')
<<<<<<< HEAD
const { registerUser, loginUser } = require('../controllers/user.controller')
=======
const { registerUser, loginUser, LogoutUser } = require('../controllers/user.controller')
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
<<<<<<< HEAD
=======
router.post('/logout', LogoutUser)
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

module.exports = router