const express = require('express')
const model = require('../models/Order')
<<<<<<< HEAD
const mongoose = require('mongoose')
const { validationResult } = require('express-validator') // for validation

const placeOrder = async (req, res) => {
  const { orderItems } = req.body;

    try {
        const orders = await Promise.all(orderItems.map(async (item) => {
            const product = item.product;
            const newOrder = await model.create({
                user: req.session.userId,
                product: product,
                quantity: item.quantity,
                total: item.total,
                address: req.session.address,
            });
            return newOrder;
        }));

        const orderIds = orders.map(order => order._id);

        res.status(201).json({ message: 'Order placed successfully', orderIds: orderIds });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
  
=======
const Cart = require('../models/Cart');
const mongoose = require('mongoose')
const { validationResult } = require('express-validator') // for validation

// const placeOrder = async (req, res) => {
//   const { orderItems } = req.body;

//     try {
//         const orders = await Promise.all(orderItems.map(async (item) => {
//             const product = item.product;
//             const newOrder = await model.create({
//                 user: req.session.userId,
//                 product: product,
//                 quantity: item.quantity,
//                 total: item.total,
//                 address: req.session.address,
//             });
//             return newOrder;
//         }));

//         const orderIds = orders.map(order => order._id);

//         res.status(201).json({ message: 'Order placed successfully', orderIds: orderIds });
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

const placeOrder = async (req, res) => {
  userId = req.session.userId

  try {
    const { totalPrice } = req.body
    // Get the cart for the current user
    const cart = await Cart.findOne({ user: userId })
    if (!cart || cart.orderItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }
    const orderItems = cart.orderItems.map(item => ({
      product: item.product,
      quantity: item.quantity,
      total: item.total,
    }))
    const newOrder = new model({ user: userId, orderItems, total: totalPrice, address: req.session.address })
    await newOrder.save()

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id })
  } catch (error) {
    console.error('Error placing order:', error)
    res.status(500).json({ message: 'Failed to place order' })
  }
}
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

const getOneOrder = async (req, res) => {
  // userId = req.session.userId
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  try {
<<<<<<< HEAD
    const order = await model.findOne({ _id: id }).populate('product').populate('user')
=======
    const order = await model.findOne({ _id: id }).populate('orderItems.product').populate('user')
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.status(200).json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getOrders = async (req, res) => {
<<<<<<< HEAD
  userId = req.session.userId

  try {
    const orders = await model.find({ user: userId }).populate('product')
=======
  const userId = req.session.userId

  try {
    const orders = await model.find({ user: userId }).populate('orderItems.product')
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getAllOrders = async (req, res) => {
  try {
<<<<<<< HEAD
    const orders = await model.find().populate('product').populate('user')
=======
    const orders = await model.find().populate('orderItems.product').populate('user')
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

<<<<<<< HEAD
=======
const getPendingOrders = async (req, res) => {
  const status = "pending";

  try {
    const orders = await model.find({ status: status }).populate('orderItems.product').populate('user');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
const removeOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  try {
    const order = await model.findByIdAndDelete({ _id: id })
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json('Order deleted successfully')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateOrder = async (req, res) => {
<<<<<<< HEAD
  const { id } = req.params
  const updates = req.body // Capture update data from request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  try {
    const order = await model.findByIdAndUpdate({ _id: id }, updates, { new: true }) // Return updated doc
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    console.error(error)
    res.statement(500).json({ error: 'Internal Server Error' }) // typo fixed: status instead of statement
  }
}
=======
  const { id } = req.params;
  const updates = req.body; // Capture update data from request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid order ID' });
  }

  try {
    const order = await model.findByIdAndUpdate({ _id: id }, updates, { new: true }); // Return updated doc
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Corrected 'res.statement' to 'res.status'
  }
};

>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
      const cartItem = await model.findOneAndUpdate(
          { 'product._id': productId },
          { $set: { 'quantity': quantity } },
          { new: true }
      );
      
      if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json({ message: 'Quantity updated successfully', cartItem });
  } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  placeOrder,
  getOneOrder,
  getOrders,
  removeOrder,
  updateOrder,
  updateQuantity,
<<<<<<< HEAD
  getAllOrders
=======
  getAllOrders,
  getPendingOrders
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
}
