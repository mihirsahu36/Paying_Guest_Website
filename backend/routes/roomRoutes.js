const express = require('express');
const multer = require('multer');
const router = express.Router();
const Room = require('../models/roomModel');
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

// Route to get available rooms with optional type filter
router.get('/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const rooms = await Room.find({ type: type, status: 'available' }).lean();
    if (rooms.length === 0) {
      return res.status(404).send('No available rooms found for the specified type.');
    }

    // Fetch guests for each room and filter out unvalidated guests
    const roomDetails = await Promise.all(rooms.map(async (room) => {
      const guests = await Guest.find({ roomNumber: room.roomNumber, isValidated: true }, 'name age workProfile isValidated').lean();
      console.log(`Room Number: ${room.roomNumber}, Guests:`, guests);
      return { ...room, currentGuests: guests };
    }));

    console.log('Room details fetched:', roomDetails);
    res.json(roomDetails);
  } catch (error) {
    console.error(`Error fetching rooms: ${error.message}`);
    res.status(500).send(`Error fetching rooms: ${error.message}`);
  }
});

// Route to fetch room by room number
router.get('/number/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const room = await Room.findOne({ roomNumber: roomNumber }).lean();
    if (!room) {
      return res.status(404).send('Room not found.');
    }

    // Fetch validated guests for the room
    const guests = await Guest.find({ roomNumber: room.roomNumber, isValidated: true }, 'name age workProfile isValidated').lean();
    room.currentGuests = guests;

    console.log('Room details:', room);
    res.json(room);
  } catch (error) {
    console.error(`Error fetching room: ${error.message}`);
    res.status(500).send(`Error fetching room: ${error.message}`);
  }
});

// Route to add a room
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]), async (req, res) => {
  const { type, price, details, roomNumber, status, maxGuests, currentGuestsCount } = req.body;
  
  const roomData = {
    type,
    price,
    details,
    roomNumber,
    status,
    maxGuests,
    currentGuestsCount
  };
  
  if (req.files['image']) {
    roomData.image = req.files['image'][0].filename;
  }
  if (req.files['additionalImages']) {
    roomData.additionalImages = req.files['additionalImages'].map(file => file.filename);
  }

  try {
    const room = new Room(roomData);
    await room.save();
    console.log('Room added successfully:', room);
    res.status(201).send('Room added successfully');
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).send('Server error');
  }
});

// Route to update a room
router.put('/update/:roomNumber', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]), async (req, res) => {
  const { roomNumber } = req.params;
  const { type, price, details, status, maxGuests, currentGuestsCount } = req.body;
  
  const roomData = {
    type,
    price,
    details,
    status,
    maxGuests,
    currentGuestsCount
  };
  
  if (req.files['image']) {
    roomData.image = req.files['image'][0].filename;
  }
  if (req.files['additionalImages']) {
    roomData.additionalImages = req.files['additionalImages'].map(file => file.filename);
  }

  try {
    const room = await Room.findOneAndUpdate({ roomNumber: roomNumber }, roomData, { new: true });

    if (!room) {
      return res.status(404).send('Room not found.');
    }

    console.log('Room updated successfully:', room);
    res.status(200).send('Room updated successfully');
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).send('Server error');
  }
});

// Serve static images from the 'uploads' directory
router.use('/uploads', express.static('uploads'));

module.exports = router;
