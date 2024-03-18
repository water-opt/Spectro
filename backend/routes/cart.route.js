const express = require('express')
const router = express.Router()
const { getCartItems, updateCartItemQuantity, add } = require('../controllers/cart.controller')

router.get('/', getCartItems)
router.put('/:productId', updateCartItemQuantity)
router.post('/', add)

module.exports = router
