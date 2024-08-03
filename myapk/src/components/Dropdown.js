import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./dropdown.module.css"; // Ensure you have a dropdown.module.css file with appropriate styles

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [roomDetails, setRoomDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const options = [
    { value: "1 Sharing Room", label: "1 Sharing Room" },
    { value: "2 Sharing Room", label: "2 Sharing Room" },
    { value: "3 Sharing Room", label: "3 Sharing Room" }
  ];

  useEffect(() => {
    if (selectedOption) {
      axios.get(`http://localhost:5000/api/rooms/${encodeURIComponent(selectedOption)}`)
        .then((response) => {
          const rooms = response.data;
          if (rooms.length === 0) {
            setErrorMessage("Sorry, no rooms available at this moment. Please contact the owner.");
          } else {
            setErrorMessage("");
            setRoomDetails(rooms);
          }
        })
        .catch((error) => {
          console.error("Error fetching room details:", error);
          setErrorMessage(error.response.data || "Sorry, an error occurred while fetching room details.");
        });
    }
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewDetails = (room) => {
    navigate('/RoomDetails', { state: { room } });
  };

  return (
    <div className={styles.dropdown}>
      <select
        className={styles.dropdownSelect}
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="" disabled>Select Room Type</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      {roomDetails.length > 0 && (
        <div className={styles.roomList}>
          {roomDetails.map(room => (
            <div key={room._id} className={styles.roomItem}>
              <img src={`http://localhost:5000/uploads/${room.image}`} alt={room.type} className={styles.roomImage} />
              <div className={styles.roomInfo}>
                <h2>{room.type}</h2>
                <p>Room Number: {room.roomNumber}</p>
                <p>Price: {room.price}</p>
                <button onClick={() => handleViewDetails(room)} className={styles.viewDetailsButton}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
