const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        require: true
    },
    quantity: {
        type: Number,
        require: true,
        default: 1
    },
    total: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('Order', orderSchema)