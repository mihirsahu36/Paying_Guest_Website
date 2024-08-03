const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: String,
  price: Number,
  details: String,
  image: String,
  roomNumber: Number,
  additionalImages: [String],
  status: { type: String, default: 'available' },
  maxGuests: Number,
  currentGuestsCount: { type: Number, default: 0 }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
