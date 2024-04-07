const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    },
<<<<<<< HEAD
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
=======
    orderItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: { type: Number, required: true },
          total: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true
    }
     // product: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Product',
    //     require: true
    // },
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
})

module.exports = mongoose.model('Cart', cartSchema)