const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: String,
  adhaarNumber: String,
  phoneNumber: String,
  workProfile: String,
  age: Number,
  address: String,
  email: String,
  image: String,
  roomNumber: String,
  username: String, // Add this line
  password: String,
  isValidated: { type: Boolean, default: false } // Add this line
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
