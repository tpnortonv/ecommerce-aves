// controllers/paymentController.js
const paymentService = require('../services/paymentService');

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await paymentService.createPaymentIntent(amount);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPaymentIntent = async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const paymentIntent = await paymentService.verifyPaymentIntent(paymentIntentId);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

