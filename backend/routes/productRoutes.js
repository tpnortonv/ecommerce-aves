const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Rutas para productos
router.get('/', productController.getProducts); // Obtener todos los productos
router.get('/:id', productController.getProduct); // Obtener un producto por ID
router.post('/', productController.createProduct); // Crear un producto
router.put('/:id', productController.updateProduct); // Actualizar un producto
router.delete('/:id', productController.deleteProduct); // Eliminar un producto

module.exports = router;



