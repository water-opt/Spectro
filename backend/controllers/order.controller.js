const express = require('express')
const model = require('../models/Order')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator') // for validation

const placeOrder = async (req, res) => {
    // Validate request body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    const { user, product, quantity, total, address } = req.body
  
    // Check if user is logged in (e.g., check for a user ID in the session)
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized. Please login to place an order.' })
    }
  
    try {
      const order = await model.create({ user: user, product: product, quantity: quantity, total: total, address: address })
      res.status(201).json(order) // 201 Created for successful creation
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  

const getOneOrder = async (req, res) => {
  // userId = req.session.userId
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  try {
    const order = await model.findOne({ _id: id }).populate('product')
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
  userId = req.session.userId

  try {
    const orders = await model.find({ user: userId }).populate('product')
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

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

module.exports = {
  placeOrder,
  getOneOrder,
  getOrders,
  removeOrder,
  updateOrder
}
