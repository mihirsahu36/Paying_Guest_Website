import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const RegisterForm = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');

  const handleRegister = () => {
    console.log('Checking Aadhaar number:', aadhaarNumber);
    axios.post('http://localhost:5000/api/auth/check-aadhaar', { aadhaarNumber })
      .then(response => {
        console.log('Aadhaar check response:', response.data);
        if (response.data.valid) {
          console.log('Aadhaar is valid, proceeding with registration');
          axios.post('http://localhost:5000/api/auth/register', {
            aadhaarNumber,
            username,
            password
          })
          .then(response => {
            console.log('Registration response:', response.data);
            alert('Registration successful!');
            onClose();
          })
          .catch(error => {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
          });
        } else {
          console.log('Aadhaar number not matched');
          alert('Aadhaar number not matched. Check properly.');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log('Aadhaar number not found');
          alert('Aadhaar number not found. Please check the number and try again.');
        } else {
          console.error('Error checking Aadhaar number:', error);
          alert('Error checking Aadhaar number. Please try again later.');
        }
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Aadhaar Number"
          type="text"
          fullWidth
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRegister} color="primary">Register</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterForm;
