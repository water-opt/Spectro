const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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
    }
})

module.exports = mongoose.model('Cart', cartSchema)