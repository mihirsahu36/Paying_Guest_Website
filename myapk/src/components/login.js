import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import './files_css/login.css'; // Import the login.css file

const Login = () => {
  const [role, setRole] = useState('guest');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true); // Track registration status
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Logging in with:', { role, username, password });
    axios.post('http://localhost:5000/api/auth/login', { role, username, password })
      .then(response => {
        setIsRegistered(response.data.isRegistered); // Example: Set registration status
        alert(response.data.message || 'Login successful');
        console.log(response.data);

        if (role === 'admin') {
          navigate('/admin-dashboard'); // Redirect to admin dashboard
        } else if (role === 'guest') {
          if (response.data.guest.isValidated) {
            navigate('/guest-dashboard', { state: { guest: response.data.guest } }); // Redirect to guest dashboard
          } else {
            alert('Your account has not been validated by the admin yet.');
          }
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response);
          if (error.response.status === 401) {
            alert('Invalid credentials');
          } else {
            alert('Error logging in. Please try again later.');
          }
        } else {
          console.error('Error:', error);
          alert('Error logging in. Please try again later.');
        }
      });
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="login-container">
      <div className="background-video-container">
        <video autoPlay loop muted>
          <source src="https://videos.pexels.com/video-files/1826896/1826896-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="header">
        <p className="title">Sri Balaji PG</p>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a> {/* Changed to Home link */}
          <a href="/contact" className="nav-link">Contact Us</a>
          <a href="/about" className="nav-link">About Us</a>
        </nav>
      </div>
      <div className="login-tile">
        <div className="login-box">
          <h2>Login</h2>
          <FormControl fullWidth className="login-form-control">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="guest">Guest</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-form-control"
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form-control"
          />
          <Button onClick={handleLogin} color="primary" variant="contained" fullWidth className="login-button">
            Login
          </Button>
          <div className={`login-button-container ${isRegistered ? 'hidden' : ''}`} style={{ transition: 'opacity 0.5s' }}>
            <Button onClick={handleRegisterOpen} color="primary">
              Not Registered? Register Here
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={isRegisterOpen} onClose={handleRegisterClose}>
        <RegisterForm open={isRegisterOpen} onClose={handleRegisterClose} />
      </Dialog>
      <div className="footer">
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
          <a href="/faq" className="footer-link">FAQ</a>
        </div>
        <div>© 2024 Sri Balaji PG</div>
      </div>
    </div>
  );
};

export default Login;
