const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  roomNumber: String,
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },
  transactionId: String,
  screenshot: String,
  month: String,
  date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
