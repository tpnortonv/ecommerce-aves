import React, { useState } from 'react';
import axios from 'axios';

function Checkout() {
  const [token, setToken] = useState(null);

  const handleCheckout = async () => {
    const response = await axios.post('http://localhost:5000/api/payments/create-checkout-session', { items: [/* Aquí tus productos */] });
    setToken(response.data.token);
    // Aquí se llamaría a Stripe o la pasarela de pago que uses
  };

  return (
    <div className="container">
      <button onClick={handleCheckout}>Pagar</button>
      {token && <div>Procesando pago...</div>}
    </div>
  );
}

export default Checkout;



