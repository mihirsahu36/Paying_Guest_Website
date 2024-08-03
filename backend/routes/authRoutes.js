const express = require('express');
const router = express.Router();
const Guest = require('../models/guestModel');

// Route to check Aadhaar number
router.post('/check-aadhaar', async (req, res) => {
  console.log('Check Aadhaar route hit');
  const { aadhaarNumber } = req.body;
  console.log('Received Aadhaar number:', aadhaarNumber);

  try {
    const guest = await Guest.findOne({ adhaarNumber: aadhaarNumber });
    if (!guest) {
      console.log('Guest not found');
      return res.status(404).send({ valid: false });
    }

    console.log('Guest found');
    res.send({ valid: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

// Route to register a new user
router.post('/register', async (req, res) => {
  console.log('Register route hit');
  const { aadhaarNumber, username, password } = req.body;
  console.log('Received registration data:', { aadhaarNumber, username, password });

  try {
    const guest = await Guest.findOne({ adhaarNumber: aadhaarNumber });
    if (!guest) {
      console.log('Guest not found for update');
      return res.status(404).send('Guest not found');
    }

    if (!guest.isValidated) {
      console.log('Guest not validated by admin');
      return res.status(403).send('Your account has not been validated by the admin yet.');
    }

    guest.username = username;
    guest.password = password;
    await guest.save();

    console.log('Guest updated successfully:', guest);
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server error');
  }
});

// Route to handle login
router.post('/login', async (req, res) => {
  const { role, username, password } = req.body;
  console.log('Login attempt with role:', role, 'username:', username, 'password:', password);

  if (role === 'admin') {
    // Check for admin credentials
    if (username === 'admin@123' && password === '5678') {
      return res.status(200).send({ message: 'Admin login successful' });
    } else {
      return res.status(401).send('Invalid admin credentials');
    }
  } else if (role === 'guest') {
    try {
      const guest = await Guest.findOne({ username: username, password: password });
      if (!guest) {
        console.log('Invalid guest credentials');
        return res.status(401).send('Invalid guest credentials');
      }

      if (!guest.isValidated) {
        console.log('Guest account not validated');
        return res.status(403).send('Your account has not been validated by the admin yet.');
      }

      console.log('Guest login successful:', guest);
      res.status(200).send({ message: 'Guest login successful', guest: guest });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server error');
    }
  } else {
    console.log('Invalid role');
    res.status(400).send('Invalid role');
  }
});

module.exports = router;
