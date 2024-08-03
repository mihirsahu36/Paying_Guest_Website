import React from 'react';
import './files_css/PrivacyPolicy.css'; // Assuming you have CSS for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
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
      <div className="privacy-tile">
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <p>
            1. Introduction
            Welcome to SRI BALAJI PG. Your privacy is important to us. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our facility or use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.
          </p>
          <p>
            2. Information We Collect
            Personal Information: We may collect personal information such as your name, address, contact details, date of birth, identification documents (e.g., Aadhaar, passport), emergency contact details, and financial information (e.g., bank account or payment details).
            Usage Data: We may collect information on how our services are accessed and used. This data may include your computer's IP address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, and other diagnostic data.
          </p>
          <p>
            3. How We Use Your Information
            To Provide and Maintain Services: We use your personal information to provide you with our services, including processing payments, managing bookings, and communicating with you.
            To Improve Our Services: We use your information to understand how our services are being used and to improve and personalize your experience.
            To Comply with Legal Obligations: We may use your information to comply with applicable laws and regulations, such as maintaining guest registers as required by local authorities.
            Marketing and Promotions: With your consent, we may use your information to send you promotional materials and updates about our services.
          </p>
          <p>
            4. Information Sharing and Disclosure
            With Third Parties: We may share your information with third-party service providers who perform services on our behalf, such as payment processors, IT service providers, and marketing agencies. These third parties are contractually obligated to protect your information and use it only for the purposes for which it was disclosed.
            Legal Requirements: We may disclose your information if required by law, court order, or governmental regulation, or if such disclosure is necessary in support of any criminal or other legal investigation or proceeding.
          </p>
          <p>
            5. Data Security
            We use administrative, technical, and physical security measures to protect your personal information. While we strive to protect your personal information, no security measures are perfect or impenetrable, and we cannot guarantee the security of your information.
            6. Your Data Protection Rights (continued)
            Right to Object to Processing: You have the right to object to our processing of your personal data, under certain conditions.
            Right to Data Portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our provided contact information.
          </p>
          <p>
            7. Cookies and Tracking Technologies
            Our website and services may use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our services.
          </p>
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

export default PrivacyPolicy;
