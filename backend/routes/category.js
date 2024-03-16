const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.post('/', categoryController.create);
router.get('/', categoryController.readAll); 

// router.get('/', (req, res) => {
//     res.status(200).send('Hello from category routes!');
//   });

//.post('/', authenticateJWT, categoryController.create);
//router.get('/', authenticateJWT, categoryController.readAll);  


module.exports = router;

// exports.categoryController = (req, res) => {
//     res.status(200).json({ message: 'Category route reached!' });
// };