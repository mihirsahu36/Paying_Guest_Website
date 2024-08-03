import React, { useState } from "react";
import axios from "axios";
import './files_css/GuestForm.css'; // Import the CSS file

const GuestForm = ({ roomNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    adhaarNumber: "",
    phoneNumber: "",
    workProfile: "",
    age: "",
    address: "",
    email: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("roomNumber", roomNumber);

    axios.post("http://localhost:5000/api/guests", data)
      .then((response) => {
        console.log("Guest added successfully:", response);
        window.alert("Thank you for Registering");
        window.location.href = "/contact"; // Redirect to contact page
      })
      .catch((error) => {
        console.error("Error adding guest:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="guest-form">
      <label>
        Full Name:
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required autoComplete="name" />
      </label>
      <label>
        Adhaar Number:
        <input type="text" name="adhaarNumber" placeholder="Adhaar Number" onChange={handleChange} required autoComplete="off" />
      </label>
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required autoComplete="tel" />
      </label>
      <label>
        Work Profile:
        <input type="text" name="workProfile" placeholder="Work Profile" onChange={handleChange} required autoComplete="off" />
      </label>
      <label>
        Age:
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required autoComplete="off" />
      </label>
      <label>
        Address:
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required autoComplete="street-address" />
      </label>
      <label>
        Email:
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required autoComplete="email" />
      </label>
      <label>
        Image:
        <input type="file" name="image" onChange={handleFileChange} required title="Upload your image" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestForm;
