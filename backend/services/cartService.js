// services/cartService.js
const Product = require('../models/Product');
const User = require('../models/User');

const cartService = {
  // Agregar un producto al carrito de un usuario
  addToCart: async (userId, productId, quantity) => {
    try {
      // Verificar si el producto existe
      const product = await Product.findById(productId);
      if (!product) throw new Error('Producto no encontrado');

      // Buscar el usuario
      const user = await User.findById(userId);
      if (!user) throw new Error('Usuario no encontrado');

      // Verificar si el usuario ya tiene el producto en su carrito
      const existingProductIndex = user.cart.findIndex(item => item.product.toString() === productId);
      
      if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        user.cart[existingProductIndex].quantity += quantity;
      } else {
        // Si no está en el carrito, agregarlo
        user.cart.push({ product: productId, quantity });
      }

      // Guardar los cambios en el usuario
      await user.save();
      return user.cart;
    } catch (error) {
      throw new Error('Error al agregar al carrito: ' + error.message);
    }
  },

  // Eliminar un producto del carrito de un usuario
  removeFromCart: async (userId, productId) => {
    try {
      // Buscar el usuario
      const user = await User.findById(userId);
      if (!user) throw new Error('Usuario no encontrado');

      // Eliminar el producto del carrito
      user.cart = user.cart.filter(item => item.product.toString() !== productId);
      
      // Guardar los cambios
      await user.save();
      return user.cart;
    } catch (error) {
      throw new Error('Error al eliminar del carrito: ' + error.message);
    }
  },

  // Obtener el carrito de un usuario
  getCart: async (userId) => {
    try {
      // Buscar el usuario
      const user = await User.findById(userId).populate('cart.product');
      if (!user) throw new Error('Usuario no encontrado');

      return user.cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito: ' + error.message);
    }
  },

  // Vaciar el carrito de un usuario
  clearCart: async (userId) => {
    try {
      // Buscar el usuario
      const user = await User.findById(userId);
      if (!user) throw new Error('Usuario no encontrado');

      // Vaciar el carrito
      user.cart = [];

      // Guardar los cambios
      await user.save();
      return user.cart;
    } catch (error) {
      throw new Error('Error al vaciar el carrito: ' + error.message);
    }
  },
};

module.exports = cartService;

