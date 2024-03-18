const express = require('express')
const { placeOrder, getOneOrder, getOrders, removeOrder, updateOrder } = require('../controllers/order.controller')

const router = express.Router()

router.post('/', placeOrder)
router.get('/', getOrders)
router.get('/:id', getOneOrder)
router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)

module.exports = router