import React from "react";
import { useLocation, Link } from "react-router-dom";
import ImageSlider from "./ImageSlider"; // Assuming you have an ImageSlider component
import GuestForm from "./GuestForm"; // Assuming you have a GuestForm component
import './files_css/RoomDetails.css'; // Import the CSS file

const RoomDetails = () => {
  const location = useLocation();
  const { room } = location.state;

  console.log('Room data:', room); // Log the received room data

  return (
    <div className="room-details-container">
      <div className="header">
        <Link to="/" className="home-link">Go to Home Page</Link>
      </div>
      <h1 className="room-title">{room.type}</h1>
      <img className="room-image" src={`http://localhost:5000/uploads/${room.image}`} alt={room.type} />

      {room.additionalImages && room.additionalImages.length > 0 && (
        <ImageSlider images={room.additionalImages.map(img => `http://localhost:5000/uploads/${img}`)} />
      )}

      <div className="room-info">
        <h2>Room Number: {room.roomNumber}</h2>
        <p>Price: {room.price}</p>
        <p>{room.details}</p>
      </div>

      {room.currentGuests && room.currentGuests.length > 0 ? (
        <div className="current-guests-container">
          <h3 className="guests-title">Current Guests:</h3>
          <div className="current-guests-list">
            {room.currentGuests.map((guest, index) => (
              <div key={index} className="guest-item">
                <p><strong>Name:</strong> {guest.name}</p>
                <p><strong>Age:</strong> {guest.age}</p>
                <p><strong>Work Profile:</strong> {guest.workProfile}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No current guests.</p>
      )}

      <div className="guest-form-container">
        <GuestForm roomNumber={room.roomNumber} />
      </div>
    </div>
  );
};

export default RoomDetails;
