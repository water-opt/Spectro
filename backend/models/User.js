const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamp: true})

module.exports = mongoose.model('User', userSchema)