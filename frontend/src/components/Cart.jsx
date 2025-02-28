import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleRemove(item._id)}>Eliminar</button>
            </div>
          ))}
          <button onClick={handleClearCart}>Vaciar carrito</button>
          <Link to="/checkout">
            <button>Ir a Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;

