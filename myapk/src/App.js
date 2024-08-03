import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import RoomDetails from "./components/RoomDetails";
import Contact from "./components/contact"; // Assuming this is exported correctly
import About from "./components/about"; // Assuming this is exported correctly
import Login from "./components/login"; // Assuming this is exported correctly
import AdminDashboard from "./components/AdminDashboard";
import GuestDashboard from "./components/GuestDashboard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQ from "./components/FAQ";
import TermsOfService from "./components/TermsOfService";
import Images from "./components/Images"

import './App.css'; // Correct import for CSS

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/RoomDetails" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add this line */}
        <Route path="/guest-dashboard" element={<GuestDashboard />} /> {/* Add this line */}
        <Route path="/faq" element={<FAQ />} /> {/* Add this line */}
        <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Add this line */}
        <Route path="/terms" element={<TermsOfService />} /> {/* Add this line */}
        <Route path="/img" element={<Images />} /> {/* Add this line */}
        
      </Routes>
    </Router>
  );
};

export default App;
