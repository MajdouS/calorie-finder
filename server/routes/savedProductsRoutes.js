const express = require('express');
const router = express.Router();
const savedProductsController = require('../controllers/savedProductsController');

router.get('/', savedProductsController.getAllProducts);
router.get('/:id', savedProductsController.getProductById);
router.post('/', savedProductsController.createProduct);
router.put('/:id', savedProductsController.updateProduct);
router.delete('/:id', savedProductsController.deleteProduct);

module.exports = router;
