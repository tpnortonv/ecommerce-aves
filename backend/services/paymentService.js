// services/paymentService.js
const stripe = require('../config/stripeConfig');
const Payment = require('../models/Payment');

exports.createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Error al crear el pago: ' + error.message);
  }
};

exports.verifyPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      // Guardar el pago en la base de datos si se ha completado con éxito
      await Payment.create({
        user: paymentIntent.metadata.userId,
        amount: paymentIntent.amount_received,
        paymentIntentId: paymentIntent.id,
        status: 'succeeded',
      });
    }
    return paymentIntent;
  } catch (error) {
    throw new Error('Error al verificar el pago: ' + error.message);
  }
};
