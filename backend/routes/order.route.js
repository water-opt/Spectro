const express = require('express')
<<<<<<< HEAD
const { placeOrder, getOneOrder, getOrders, getAllOrders, removeOrder, updateOrder, updateQuantity } = require('../controllers/order.controller')
=======
const { placeOrder, getOneOrder, getOrders, getAllOrders, removeOrder, updateOrder, updateQuantity, getPendingOrders } = require('../controllers/order.controller')
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

const router = express.Router()

router.post('/', placeOrder)
router.get('/', getOrders)
router.get('/all', getAllOrders)
<<<<<<< HEAD
=======
router.get('/pending', getPendingOrders)
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
router.get('/:id', getOneOrder)
router.put('/:id', updateOrder)
router.delete('/:id', removeOrder)
router.put('/:id', updateQuantity)

module.exports = router