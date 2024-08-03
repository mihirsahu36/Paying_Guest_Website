import React, { useState } from 'react';
import pic1 from './images/picture1.jpeg';
import pic2 from './images/picture2.jpeg';
import pic3 from './images/picture3.jpeg';
import pic4 from './images/picture4.jpeg';
import pic5 from './images/picture5.jpg';
import pic6 from './images/picture6.jpeg';
import pic7 from './images/picture7.jpg';
import pic8 from './images/picture8.jpeg';
import pic9 from './images/picture9.jpeg';
import pic10 from './images/picture10.jpg';
import './files_css/images.css';

const images = [
  { src: pic1, alt: "Two Sharing Room, AC" },
  { src: pic2, alt: "Two Sharing Room, Non AC" },
  { src: pic3, alt: "Three Sharing Room, AC" },
  { src: pic4, alt: "Three Sharing Room, Non AC" },
  { src: pic5, alt: "Single Room with Two Beds" },
  { src: pic6, alt: "Double Sharing,  Ground Floor" },
  { src: pic7, alt: "Double Sharing,  Ground Floor" },
  { src: pic8, alt: "Double Sharing,  Fifth Floor" },
  { src: pic9, alt: "Double Sharing,   First Floor" },
  { src: pic10, alt: "Double Sharing,   Fifth Floor" },
];

const Images = () => {
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  const handleCloseClick = () => {
    setActiveImage(null);
  };

  return (
    <div className="images-container">
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
      <div className="images-tile">
        <h1>Image Section</h1>
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-item" onClick={() => handleImageClick(image)}>
              <img src={image.src} alt={image.alt} />
              <p>{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
      {activeImage && (
        <div className="image-modal" onClick={handleCloseClick}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseClick}>&times;</span>
            <img src={activeImage.src} alt={activeImage.alt} className="expanded-image" />
            <p>{activeImage.alt}</p>
          </div>
        </div>
      )}
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

export default Images;
