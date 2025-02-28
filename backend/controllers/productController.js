const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Obtener productos directamente desde el modelo
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por su ID
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Buscar un producto por ID
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = new Product(productData); // Crear un nuevo producto
    await newProduct.save(); // Guardar en la base de datos
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true }); // Actualizar el producto
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id); // Eliminar el producto
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send(); // Respuesta vacía si se elimina correctamente
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};

