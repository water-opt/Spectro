<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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
    },
    address: {
        type: String,
        required: true
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    },
    status: {
        type: String,
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
<<<<<<< HEAD
})

module.exports = mongoose.model('Order', orderSchema)
=======
});

module.exports = mongoose.model('Order', orderSchema);
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
