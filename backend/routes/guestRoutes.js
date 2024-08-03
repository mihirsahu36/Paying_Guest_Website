const express = require('express');
const multer = require('multer');
const Guest = require('../models/guestModel');
const Room = require('../models/roomModel');

const router = express.Router();

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

// Route to handle guest form submission
router.post('/', upload.single('image'), async (req, res) => {
  const guestData = req.body;
  guestData.image = req.file ? req.file.filename : ''; // Save the file path
  guestData.isValidated = false; // Set isValidated to false initially

  try {
    const newGuest = new Guest(guestData);
    const savedGuest = await newGuest.save();
    console.log('Guest added:', savedGuest);
    res.status(201).send('Guest added successfully');
  } catch (error) {
    res.status(400).send('Error adding guest: ' + error);
  }
});

// Route to update a guest
router.put('/update/:adhaarNumber', upload.single('image'), async (req, res) => {
  const { adhaarNumber } = req.params;
  const guestData = req.body;
  if (req.file) {
    guestData.image = req.file.filename;
  }

  try {
    const guest = await Guest.findOneAndUpdate({ adhaarNumber: adhaarNumber }, guestData, { new: true });
    if (!guest) {
      return res.status(404).send('Guest not found');
    }
    console.log('Guest updated:', guest);
    res.status(200).send('Guest updated successfully');
  } catch (error) {
    res.status(400).send('Error updating guest: ' + error);
  }
});

// Route to validate a guest
router.put('/validate/:adhaarNumber', async (req, res) => {
  const { adhaarNumber } = req.params;

  try {
    const guest = await Guest.findOneAndUpdate({ adhaarNumber: adhaarNumber }, { isValidated: true }, { new: true });
    if (!guest) {
      return res.status(404).send('Guest not found');
    }
    console.log('Guest validated:', guest);

    const room = await Room.findOne({ roomNumber: guest.roomNumber });
    if (room) {
      room.currentGuestsCount += 1;
      if (room.currentGuestsCount >= room.maxGuests) {
        room.status = 'unavailable';
      }
      await room.save();
    }

    res.status(200).send('Guest validated successfully');
  } catch (error) {
    res.status(400).send('Error validating guest: ' + error);
  }
});

// Route to delete a guest
router.delete('/:adhaarNumber', async (req, res) => {
  const { adhaarNumber } = req.params;

  try {
    const guest = await Guest.findOneAndDelete({ adhaarNumber: adhaarNumber });

    if (!guest) {
      return res.status(404).send('Guest not found');
    }
    console.log('Guest deleted:', guest);

    const room = await Room.findOne({ roomNumber: guest.roomNumber });
    if (room) {
      room.currentGuestsCount -= 1;
      if (room.currentGuestsCount < room.maxGuests) {
        room.status = 'available';
      }
      await room.save();
    }

    res.status(200).send('Guest deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting guest: ' + error);
  }
});

// Route to fetch guest by Aadhaar number
router.get('/:adhaarNumber', async (req, res) => {
  const { adhaarNumber } = req.params;
  try {
    const guest = await Guest.findOne({ adhaarNumber: adhaarNumber }).lean();
    if (!guest) {
      return res.status(404).send('Guest not found.');
    }
    console.log('Fetched guest:', guest);
    res.json(guest);
  } catch (error) {
    res.status(500).send(`Error fetching guest: ${error.message}`);
  }
});

module.exports = router;
