// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-payment', paymentController.createPaymentIntent);
router.post('/verify-payment', paymentController.verifyPaymentIntent);

module.exports = router;

