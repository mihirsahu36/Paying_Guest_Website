const express = require('express');
const multer = require('multer');
const router = express.Router();
const Payment = require('../models/paymentModel');
const Guest = require('../models/guestModel');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Route to handle payment submissions
router.post('/submit-payment', upload.single('screenshot'), async (req, res) => {
  const { roomNumber, guestId, transactionId, month } = req.body;
  const screenshot = req.file.filename;

  try {
    const newPayment = new Payment({
      roomNumber,
      guestId,
      transactionId,
      screenshot,
      month
    });

    await newPayment.save();
    res.status(201).send('Payment submitted successfully');
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).send('Server error');
  }
});

// Route to fetch payments by room number or Aadhaar number
router.get('/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const guests = await Guest.find({
      $or: [
        { adhaarNumber: searchTerm },
        { roomNumber: searchTerm }
      ]
    }).lean();

    if (guests.length === 0) {
      return res.status(404).send('No guests found for the specified criteria.');
    }

    const payments = await Payment.find({
      guestId: { $in: guests.map(g => g._id) }
    }).populate('guestId', 'name').lean();

    if (payments.length === 0) {
      return res.status(404).send('No payments found for the specified criteria.');
    }

    res.json(payments);
  } catch (error) {
    res.status(500).send(`Error fetching payments: ${error.message}`);
  }
});

module.exports = router;
