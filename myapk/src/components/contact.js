import React from 'react';
import './files_css/contact.css'; // Import the correct CSS file

const ContactUs = () => {
  return (
    <div className="contactus-container">
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
      <div className="contactus-tile">
        <div className="contactus-box">
          <h2>Contact Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0762480729113!2d77.71452947491825!3d12.966972687347987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1223fc9dd1db%3A0x679620f7a86846b8!2sBrookefield%20Hospital%20-%20Your%20Friendly%20Neighbourhood%20Hospital!5e0!3m2!1sen!2sin!4v1721882178107!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
          <div className="contact-details">
            <h3>Address</h3>
            <p>AECS Layout, Near Brookefield Mall, Kundalahalli</p>
            <h3>Contact Number</h3>
            <p>+91 98219 94491</p>
            <h3>Email</h3>
            <p>sribalajicpg@gmail.com</p>
          </div>
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

export default ContactUs;
