import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { format } from 'date-fns'; 
import './files_css/GuestDashboard.css'

const GuestDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const guest = location.state.guest;
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const currentMonth = format(new Date(), 'MMMM');

  const handleComplaintOpen = () => {
    setIsComplaintOpen(true);
  };

  const handleComplaintClose = () => {
    setIsComplaintOpen(false);
  };

  const handlePaymentOpen = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
  };

  const handleLogout = () => {
    // Perform any logout operations if needed (e.g., clearing tokens, notifying server, etc.)
    navigate('/'); // Redirect to the home page
  };

  const handleSubmitComplaint = () => {
    axios.post('http://localhost:5000/api/complaints/submit-complaint', {
      roomNumber: guest.roomNumber,
      complaintType,
      description,
      guestId: guest._id
    })
    .then(response => {
      alert('Your issue will be resolved shortly.');
      handleComplaintClose();
    })
    .catch(error => {
      console.error('Error submitting complaint:', error);
      alert('Error submitting complaint. Please try again later.');
    });
  };

  const handleSubmitPayment = () => {
    const formData = new FormData();
    formData.append('roomNumber', guest.roomNumber);
    formData.append('guestId', guest._id);
    formData.append('transactionId', transactionId);
    formData.append('screenshot', screenshot);
    formData.append('month', currentMonth);

    axios.post('http://localhost:5000/api/payments/submit-payment', formData)
      .then(response => {
        alert('Payment submitted successfully.');
        handlePaymentClose();
      })
      .catch(error => {
        console.error('Error submitting payment:', error);
        alert('Error submitting payment. Please try again later.');
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={`http://localhost:5000/uploads/${guest.image}`} alt={guest.name} style={{ maxWidth: "100px", height: "auto" }} />
        <h1>Guest Dashboard</h1>
        <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</Button> {/* Logout button */}
      </div>
      <div className="dashboard-info">
        <p><strong>Name:</strong> {guest.name}</p>
        <p><strong>Phone Number:</strong> {guest.phoneNumber}</p>
        <p><strong>Email:</strong> {guest.email}</p>
        <p><strong>Aadhaar Number:</strong> {guest.adhaarNumber}</p>
        <p><strong>Room Number:</strong> {guest.roomNumber}</p>
        <p><strong>Age:</strong> {guest.age}</p>
        <p><strong>Work Profile:</strong> {guest.workProfile}</p>
        <p><strong>Address:</strong> {guest.address}</p>
      </div>
      <div className="dashboard-actions">
        <Button variant="contained" color="primary" onClick={handleComplaintOpen}>Register Complaint</Button>
        <Button variant="contained" color="secondary" onClick={handlePaymentOpen}>Make Payment</Button>
      </div>
      
      {/* Complaint Dialog */}
      <Dialog open={isComplaintOpen} onClose={handleComplaintClose}>
        <DialogTitle>Register Complaint</DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            margin="dense"
            label="Room Number"
            type="text"
            fullWidth
            value={guest.roomNumber}
            disabled
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type of Complaint</InputLabel>
            <Select
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <MenuItem value="cleaning">Cleaning</MenuItem>
              <MenuItem value="electricity">Electricity</MenuItem>
              <MenuItem value="roommates">Room Mates</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitComplaint} color="primary">Submit</Button>
          <Button onClick={handleComplaintClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onClose={handlePaymentClose}>
        <DialogTitle>Make Payment for {currentMonth}</DialogTitle>
        <DialogContent className="dialog-content">
          <img src={`http://localhost:5000/uploads/scanner.jpeg`} alt="Scanner" />
          <TextField
            margin="dense"
            label="Transaction ID"
            type="text"
            fullWidth
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          <div className="file-upload">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Screenshot
              </Button>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPayment} color="primary">Submit</Button>
          <Button onClick={handlePaymentClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GuestDashboard;
