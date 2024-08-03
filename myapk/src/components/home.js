import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import "./files_css/home.css";

const Home = () => {
  const [activeTile, setActiveTile] = useState(null);

  const handleTileClick = (tile) => {
    if (activeTile !== tile) {
      setActiveTile(tile);
    }
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    setActiveTile(null);
  };

  const messMenu = {
    Monday: { 
        Breakfast: "Idli with Sambar and Chutney", 
        Lunch: "Dal Rice", 
        EveningSnack: "Samosa", 
        Dinner: "Roti with Paneer Curry" 
    },
    Tuesday: { 
        Breakfast: "Poha", 
        Lunch: "Chapati with Sabzi", 
        EveningSnack: "Pakora", 
        Dinner: "Rice with Chicken Curry" 
    },
    Wednesday: { 
        Breakfast: "Aloo Paratha with Curd and Pickle", 
        Lunch: "Curd Rice", 
        EveningSnack: "Bhel Puri", 
        Dinner: "Vegetable Biryani with Raita" 
    },
    Thursday: { 
        Breakfast: "Upma", 
        Lunch: "Rajma Chawal", 
        EveningSnack: "Chole Bhature", 
        Dinner: "Roti with Mixed Vegetable Sabzi" 
    },
    Friday: { 
        Breakfast: "Bread Toast with Butter/Jam and Boiled Eggs", 
        Lunch: "Dal Rice", 
        EveningSnack: "Samosa", 
        Dinner: "Dosa with Sambar and Chutney" 
    },
    Saturday: { 
        Breakfast: "Idli with Sambar and Chutney", 
        Lunch: "Vegetable Pulao with Raita", 
        EveningSnack: "Pakora", 
        Dinner: "Roti with Paneer Curry" 
    },
    Sunday: { 
        Breakfast: "Aloo Paratha with Curd and Pickle", 
        Lunch: "Chapati with Sabzi", 
        EveningSnack: "Bhel Puri", 
        Dinner: "Rice with Chicken Curry" 
    },
};


const holidays = [
  { date: "January 1", event: "New Year's Day (Celebration of the first day of the year)" },
  { date: "January 14", event: "Pongal (Harvest festival celebrated mainly in Tamil Nadu)" },
  { date: "January 14", event: "Makar Sankranti (Festival marking the transition of the sun into Capricorn)" },
  { date: "January 26", event: "Republic Day (Commemorates the adoption of the Indian Constitution in 1950)" },
  { date: "February 16", event: "Vasant Panchami (Festival dedicated to Saraswati, the goddess of knowledge and arts)" }, // Date may vary
  { date: "March 11", event: "Maha Shivaratri (Hindu festival dedicated to Lord Shiva)" }, // Date may vary
  { date: "March 29", event: "Holi (Festival of colors celebrating the arrival of spring and the victory of good over evil)" }, // Date may vary
  { date: "April 21", event: "Ram Navami (Celebrates the birth of Lord Rama)" }, // Date may vary
  { date: "April 25", event: "Mahavir Jayanti (Birth anniversary of Lord Mahavir, the founder of Jainism)" }, // Date may vary
  { date: "April 14", event: "Good Friday (Christian holiday commemorating the crucifixion of Jesus Christ)" }, // Date may vary
  { date: "May 3", event: "Eid-ul-Fitr (Marks the end of Ramadan, the Islamic holy month of fasting)" }, // Date may vary
  { date: "May 26", event: "Buddha Purnima (Celebrates the birth, enlightenment, and death of Gautama Buddha)" }, // Date may vary
  { date: "June 23", event: "Rath Yatra (Chariot festival dedicated to Lord Jagannath in Puri, Odisha)" }, // Date may vary
  { date: "July 10", event: "Eid-ul-Adha (Islamic festival of sacrifice)" }, // Date may vary
  { date: "August 15", event: "Independence Day (Celebrates India's independence from British rule in 1947)" },
  { date: "August 22", event: "Raksha Bandhan (Festival celebrating the bond between brothers and sisters)" }, // Date may vary
  { date: "August 30", event: "Janmashtami (Celebrates the birth of Lord Krishna)" }, // Date may vary
  { date: "September 10", event: "Ganesh Chaturthi (Festival celebrating the birth of Lord Ganesha)" }, // Date may vary
  { date: "October 2", event: "Gandhi Jayanti (Birth anniversary of Mahatma Gandhi)" },
  { date: "October 24", event: "Dussehra (Celebrates the victory of Lord Rama over the demon king Ravana)" },
  { date: "October 29", event: "Milad-un-Nabi (Celebrates the birth of the Prophet Muhammad)" }, // Date may vary
  { date: "November 12", event: "Diwali (Festival of lights celebrating the victory of light over darkness and good over evil)" },
  { date: "November 19", event: "Guru Nanak Jayanti (Celebrates the birth of Guru Nanak, the founder of Sikhism)" }, // Date may vary
  { date: "December 25", event: "Christmas (Celebrates the birth of Jesus Christ)" },
];


  return (
    <div className={`home ${activeTile ? "tile-active" : ""}`}>
      <div className="background-video-container">
        <video autoPlay loop muted>
          <source src="https://videos.pexels.com/video-files/1826896/1826896-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="header">
        <p className="title">Sri Balaji PG</p>
        <nav className="nav">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/img" className="nav-link">Pictures</Link>
        </nav>
      </div>
      <div className="body">
        <div
          className={`tile ${activeTile === "dropdown" ? "active" : ""}`}
          onClick={() => handleTileClick("dropdown")}
        >
          <h2>Rooms</h2>
          {activeTile === "dropdown" && (
            <>
              <button className="close-button" onClick={handleCloseClick}>X</button>
              <div className="room-dropdown-container">
                <Dropdown />
              </div>
            </>
          )}
        </div>
        <div
          className={`tile ${activeTile === "mess" ? "active" : ""}`}
          onClick={() => handleTileClick("mess")}
        >
          <h2>Mess</h2>
          {activeTile === "mess" && (
            <>
              <button className="close-button" onClick={handleCloseClick}>X</button>
              <div className="mess-menu">
                {Object.keys(messMenu).map(day => (
                  <div key={day} className="day-menu">
                    <h3>{day}</h3>
                    <p>Breakfast: {messMenu[day].Breakfast}</p>
                    <p>Lunch: {messMenu[day].Lunch}</p>
                    <p>Dinner: {messMenu[day].Dinner}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div
          className={`tile ${activeTile === "holidays" ? "active" : ""}`}
          onClick={() => handleTileClick("holidays")}
        >
          <h2>Celebration</h2>
          {activeTile === "holidays" && (
            <>
              <button className="close-button" onClick={handleCloseClick}>X</button>
              <div className="holidays-list">
                {holidays.map((holiday, index) => (
                  <div key={index} className="holiday-item">
                    <h3>{holiday.date}</h3>
                    <p>{holiday.event}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="footer">
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
        </div>
        <div>© 2024 Sri Balaji PG</div>
      </div>
    </div>
  );
};

export default Home;
