// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentIntentId: { type: String, required: true },
  status: { type: String, enum: ['succeeded', 'failed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

