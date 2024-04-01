const express = require('express')
const { placeOrder, getOneOrder, getOrders, getAllOrders, removeOrder, updateOrder, updateQuantity, getPendingOrders } = require('../controllers/order.controller')

const router = express.Router()

router.post('/', placeOrder)
router.get('/', getOrders)
router.get('/all', getAllOrders)
router.get('/pending', getPendingOrders)
router.get('/:id', getOneOrder)
router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)
router.put('/:id', updateQuantity)

module.exports = router