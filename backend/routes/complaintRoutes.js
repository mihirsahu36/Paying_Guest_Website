const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaintModel');

// Route to handle complaint submissions
router.post('/submit-complaint', async (req, res) => {
  const { roomNumber, complaintType, description, guestId } = req.body;

  try {
    const newComplaint = new Complaint({
      roomNumber,
      complaintType,
      description,
      guestId
    });

    await newComplaint.save();
    res.status(201).send('Complaint submitted successfully');
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).send('Server error');
  }
});

// Route to fetch all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('guestId', 'name adhaarNumber phoneNumber');
    res.json(complaints);
  } catch (error) {
    res.status(500).send(`Error fetching complaints: ${error.message}`);
  }
});

// Route to update complaint status
router.put('/resolve/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).send('Complaint not found');
    }

    complaint.status = 'Resolved';
    await complaint.save();
    res.status(200).send('Complaint resolved successfully');
  } catch (error) {
    res.status(500).send('Error resolving complaint: ' + error.message);
  }
});

module.exports = router;
