import React from 'react';
import { Button } from '@mui/material';
import './files_css/aboutus.css'; // Import the aboutus.css file

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="background-video-container">
        <video autoPlay loop muted>
          <source src="https://videos.pexels.com/video-files/1826896/1826896-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="header">
        <h1 className="title">Sri Balaji PG</h1>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/contact" className="nav-link">Contact Us</a>
          <a href="/about" className="nav-link">About Us</a>
        </nav>
      </div>
      <div className="aboutus-tile">
        <div className="aboutus-box">
          <h2>About Us</h2>
          <p>
            Welcome to Sri Balaji PG, your home away from home. We offer comfortable and affordable accommodation with all the amenities you need for a pleasant stay. Our dedicated staff is here to ensure you have a great experience.
          </p>
          <p>
            Our mission is to provide a safe, clean, and friendly environment for our residents. We take pride in our facilities and strive to offer the best service possible.
          </p>
          <Button href="/contact" color="primary" variant="contained" className="aboutus-button">
            Contact Us
          </Button>
        </div>
      </div>
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

export default AboutUs;