const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  roomNumber: String,
  complaintType: String,
  description: String,
  guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
