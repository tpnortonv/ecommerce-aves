import React, { useState } from 'react';
import axios from 'axios';

function CheckoutForm() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    const response = await axios.post('http://localhost:5000/api/payments/checkout-session', { /* tus datos */ });
    if (response.data.success) {
      setPaymentSuccess(true);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pagar</button>
      {paymentSuccess && <p>Pago exitoso</p>}
    </div>
  );
}

export default CheckoutForm;

