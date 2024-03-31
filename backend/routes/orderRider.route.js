const express = require('express')
const { addOrder, getAssignedOrders } = require('../controllers/orderRider.controller')

const router = express.Router()

router.post('/', addOrder)
router.get('/', getAssignedOrders)

module.exports = router