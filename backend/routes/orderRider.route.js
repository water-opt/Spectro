const express = require('express')
const { addOrder, getClickedOrder, getAssignedOrders, getAllOrders } = require('../controllers/orderRider.controller')

const router = express.Router()

router.post('/', addOrder)
router.get('/', getAssignedOrders)
router.get('/all', getAllOrders)
router.get('/:id', getClickedOrder)

module.exports = router