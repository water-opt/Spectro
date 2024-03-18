const Cart = require('../models/Cart');
const { findByIdAndDelete } = require('../models/Order');

// Fetch cart items for a user
const getCartItems = async (req, res) => {
    userId = req.session.userId

    try {
        const cart = await Cart.find({ user: userId }).populate('product');
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Update quantity for a cart item
const updateCartItemQuantity = async (req, res) => {
    userId = req.session.userId

    try {
        const { productId } = req.params
        const { quantity } = req.body
        const cartItem = await Cart.findOneAndUpdate(
            { user: userId, product: productId },
            { quantity },
            { new: true }
        ).populate('product');
        res.json({ cartItem });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//temporary created 
const add = async (req, res) => {
    const { user, product, quantity } = req.body

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized. Please login to place an order.' })
    } else {
        try {
            const cart = await Cart.create({ user: user, product: product, quantity: quantity })
            res.status(201).json(cart)
          } catch (errors) {
            console.log(errors)
            res.status(500).json({ error: 'Internal Server Error' })
          }
    }
}

const deleteCartItems = async (req, res) => {
    const userId = req.session.userId
    const { id } = req.params

    try {
        const deleteOrder = await Cart.findByIdAndDelete({ _id: id, user: userId })
    } catch (errors) {
        console.log(errors)
        res.status(400).json({ error: 'Internal Server error' })
    }
}

module.exports = {
    getCartItems,
    updateCartItemQuantity,
    add,
    deleteCartItems
}
