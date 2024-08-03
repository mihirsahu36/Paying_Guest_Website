import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import axios from 'axios';
import './files_css/AdminDashboard.css'

const AdminDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'addRoom', 'updateRoom', 'addUser', 'updateDeleteUser', 'checkComplaints', 'checkPayments'
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRoomNumber, setSearchRoomNumber] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    adhaarNumber: '',
    phoneNumber: '',
    workProfile: '',
    age: '',
    address: '',
    email: '',
    image: '',
    roomNumber: ''
  });
  const [roomFormData, setRoomFormData] = useState({
    type: '',
    price: '',
    details: '',
    roomNumber: '',
    status: '',
    maxGuests: '',
    currentGuestsCount: ''
  });
  const [image, setImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [payments, setPayments] = useState([]);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogout = () => {
    // Perform any logout operations if needed (e.g., clearing tokens, notifying server, etc.)
    navigate('/'); // Redirect to the home page
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setIsDialogOpen(true);
    if (type === 'checkComplaints') {
      fetchComplaints();
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setUserDetails(null);
    setRoomDetails(null);
    setSearchTerm('');
    setSearchRoomNumber('');
    setFormData({
      name: '',
      adhaarNumber: '',
      phoneNumber: '',
      workProfile: '',
      age: '',
      address: '',
      email: '',
      image: '',
      roomNumber: ''
    });
    setRoomFormData({
      type: '',
      price: '',
      details: '',
      roomNumber: '',
      status: '',
      maxGuests: '',
      currentGuestsCount: ''
    });
    setImage(null);
    setAdditionalImages([]);
    setComplaints([]);
    setPayments([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoomFormData({
      ...roomFormData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    setAdditionalImages(Array.from(e.target.files));
  };

  const handleAddUser = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios.post('http://localhost:5000/api/guests', data)
      .then(response => {
        alert('User added successfully.');
        handleDialogClose();
      })
      .catch(error => {
        console.error('Error adding user:', error);
        alert('Error adding user. Please try again later.');
      });
  };

  const handleUpdateUser = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios.put(`http://localhost:5000/api/guests/update/${formData.adhaarNumber}`, data)
      .then(response => {
        alert('User updated successfully.');
        handleDialogClose();
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again later.');
      });
  };

  const handleValidateUser = () => {
    axios.put(`http://localhost:5000/api/guests/validate/${formData.adhaarNumber}`)
      .then(response => {
        alert('User validated successfully.');
        handleDialogClose();
      })
      .catch(error => {
        console.error('Error validating user:', error);
        alert('Error validating user. Please try again later.');
      });
  };

  const handleDeleteUser = () => {
    axios.delete(`http://localhost:5000/api/guests/${searchTerm}`)
      .then(response => {
        alert('User deleted successfully.');
        handleDialogClose();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again later.');
      });
  };

  const handleSearchUser = () => {
    axios.get(`http://localhost:5000/api/guests/${searchTerm}`)
      .then(response => {
        setUserDetails(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        alert('User not found. Please check the Aadhaar number.');
      });
  };

  const fetchComplaints = () => {
    axios.get('http://localhost:5000/api/complaints')
      .then(response => {
        setComplaints(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
        alert('Error fetching complaints. Please try again later.');
      });
  };

  const handleResolveComplaint = (id) => {
    axios.put(`http://localhost:5000/api/complaints/resolve/${id}`)
      .then(response => {
        alert('Complaint resolved successfully.');
        fetchComplaints(); // Refresh complaints list
      })
      .catch(error => {
        console.error('Error resolving complaint:', error);
        alert('Error resolving complaint. Please try again later.');
      });
  };

  const handleAddOrUpdateRoom = () => {
    const data = new FormData();
    data.append('type', roomFormData.type);
    data.append('price', roomFormData.price);
    data.append('details', roomFormData.details);
    data.append('roomNumber', roomFormData.roomNumber);
    data.append('status', roomFormData.status);
    data.append('maxGuests', roomFormData.maxGuests);
    data.append('currentGuestsCount', roomFormData.currentGuestsCount);
    if (image) {
      data.append('image', image);
    }
    additionalImages.forEach((img) => {
      data.append('additionalImages', img);
    });

    const url = dialogType === 'addRoom' ? 'http://localhost:5000/api/rooms' : `http://localhost:5000/api/rooms/update/${roomFormData.roomNumber}`;
    const method = dialogType === 'addRoom' ? 'post' : 'put';

    axios({ method, url, data })
      .then(response => {
        alert('Room added/updated successfully.');
        handleDialogClose();
      })
      .catch(error => {
        console.error('Error adding/updating room:', error);
        alert('Error adding/updating room. Please try again later.');
      });
  };

  const handleSearchRoom = () => {
    axios.get(`http://localhost:5000/api/rooms/number/${searchRoomNumber}`)
      .then(response => {
        setRoomDetails(response.data);
        setRoomFormData({
          type: response.data.type,
          price: response.data.price,
          details: response.data.details,
          roomNumber: response.data.roomNumber,
          status: response.data.status,
          maxGuests: response.data.maxGuests,
          currentGuestsCount: response.data.currentGuestsCount
        });
      })
      .catch(error => {
        console.error('Error fetching room details:', error);
        alert('Room not found. Please check the room number.');
      });
  };

  const handleSearchPayment = () => {
    axios.get(`http://localhost:5000/api/payments/${searchTerm}`)
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
        alert('Error fetching payments. Please try again later.');
      });
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome Admin!</h1>
      <div className="button-container">
        <button className="admin-button" onClick={() => handleDialogOpen('addRoom')}>Add Room</button>
        <button className="admin-button" onClick={() => handleDialogOpen('updateRoom')}>Update Room</button>
        <button className="admin-button" onClick={() => handleDialogOpen('addUser')}>Add User</button>
        <button className="admin-button" onClick={() => handleDialogOpen('updateDeleteUser')}>Update/Delete User</button>
        <button className="admin-button" onClick={() => handleDialogOpen('checkComplaints')}>Check Complaints</button>
        <button className="admin-button" onClick={() => handleDialogOpen('checkPayments')}>Check Payments</button>
        <button className="admin-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>

      {isDialogOpen && (
        <div className="dialog">
          {dialogType === 'addRoom' && (
            <>
              <h2>Add Room</h2>
              <form className="dialog-form">
                <div>
                  <label>Room Type:</label>
                  <input
                    type="text"
                    name="type"
                    value={roomFormData.type}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={roomFormData.price}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Details:</label>
                  <input
                    type="text"
                    name="details"
                    value={roomFormData.details}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Room Number:</label>
                  <input
                    type="number"
                    name="roomNumber"
                    value={roomFormData.roomNumber}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <input
                    type="text"
                    name="status"
                    value={roomFormData.status}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Max Guests:</label>
                  <input
                    type="number"
                    name="maxGuests"
                    value={roomFormData.maxGuests}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Current Guests Count:</label>
                  <input
                    type="number"
                    name="currentGuestsCount"
                    value={roomFormData.currentGuestsCount}
                    onChange={handleRoomInputChange}
                  />
                </div>
                <div>
                  <label>Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label>Additional Images:</label>
                  <input
                    type="file"
                    name="additionalImages"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                </div>
                <div>
                  <button type="button" onClick={handleAddOrUpdateRoom}>Submit</button>
                  <button type="button" onClick={handleDialogClose} className="dialog-close">Cancel</button>
                </div>
              </form>
            </>
          )}

          {dialogType === 'updateRoom' && (
            <>
              <h2>Update Room</h2>
              {!roomDetails && (
                <div>
                  <input
                    type="text"
                    placeholder="Search by Room Number"
                    value={searchRoomNumber}
                    onChange={(e) => setSearchRoomNumber(e.target.value)}
                  />
                  <button onClick={handleSearchRoom}>Search</button>
                </div>
              )}
              {roomDetails && (
                <form className="dialog-form">
                  <div>
                    <label>Room Type:</label>
                    <input
                      type="text"
                      name="type"
                      value={roomFormData.type}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={roomFormData.price}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <label>Details:</label>
                    <input
                      type="text"
                      name="details"
                      value={roomFormData.details}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <label>Room Number:</label>
                    <input
                      type="number"
                      name="roomNumber"
                      value={roomFormData.roomNumber}
                      onChange={handleRoomInputChange}
                      disabled
                    />
                  </div>
                  <div>
                    <label>Status:</label>
                    <input
                      type="text"
                      name="status"
                      value={roomFormData.status}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <label>Max Guests:</label>
                    <input
                      type="number"
                      name="maxGuests"
                      value={roomFormData.maxGuests}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <label>Current Guests Count:</label>
                    <input
                      type="number"
                      name="currentGuestsCount"
                      value={roomFormData.currentGuestsCount}
                      onChange={handleRoomInputChange}
                    />
                  </div>
                  <div>
                    <button type="button" onClick={handleAddOrUpdateRoom}>Submit</button>
                    <button type="button" onClick={handleDialogClose} className="dialog-close">Cancel</button>
                  </div>
                </form>
              )}
            </>
          )}

          {dialogType === 'addUser' && (
            <>
              <h2>Add User</h2>
              <form className="dialog-form">
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Aadhaar Number:</label>
                  <input
                    type="text"
                    name="adhaarNumber"
                    value={formData.adhaarNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Work Profile:</label>
                  <input
                    type="text"
                    name="workProfile"
                    value={formData.workProfile}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label>Room Number:</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button type="button" onClick={handleAddUser}>Submit</button>
                  <button type="button" onClick={handleDialogClose} className="dialog-close">Cancel</button>
                </div>
              </form>
            </>
          )}

          {dialogType === 'updateDeleteUser' && (
            <>
              <h2>Update/Delete User</h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter Aadhaar Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearchUser}>Search</button>
              </div>
              {userDetails && (
                <form className="dialog-form">
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Aadhaar Number:</label>
                    <input
                      type="text"
                      name="adhaarNumber"
                      value={formData.adhaarNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Work Profile:</label>
                    <input
                      type="text"
                      name="workProfile"
                      value={formData.workProfile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Room Number:</label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <button type="button" onClick={handleUpdateUser}>Update</button>
                    <button type="button" onClick={handleValidateUser}>Validate</button> {/* Validate button */}
                    <button type="button" onClick={handleDeleteUser}>Delete</button>
                    <button type="button" onClick={handleDialogClose} className="dialog-close">Cancel</button>
                  </div>
                </form>
              )}
            </>
          )}

{dialogType === 'checkComplaints' && (
  <div>
    <h2>Complaints</h2>
    <table>
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Complaint Type</th>
          <th>Description</th>
          <th>Guest Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map(complaint => (
          <tr key={complaint._id}>
            <td>{complaint.roomNumber}</td>
            <td>{complaint.complaintType}</td>
            <td>{complaint.description}</td>
            <td>{complaint.guestId ? complaint.guestId.name : 'Unknown'}</td>
            <td>{complaint.status}</td>
            <td>
              {complaint.status === 'Pending' && (
                <button onClick={() => handleResolveComplaint(complaint._id)}>Resolve</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


          {dialogType === 'checkPayments' && (
            <div>
              <h2>Check Payments</h2>
              <input
                type="text"
                placeholder="Enter Room Number or Aadhaar Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearchPayment}>Search</button>
              {payments.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Room Number</th>
                      <th>Guest Name</th>
                      <th>Transaction ID</th>
                      <th>Screenshot</th>
                      <th>Month</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment._id}>
                        <td>{payment.roomNumber}</td>
                        <td>{payment.guestId.name}</td>
                        <td>{payment.transactionId}</td>
                        <td>
                          <img src={`http://localhost:5000/uploads/${payment.screenshot}`} alt="screenshot" style={{ width: '100px' }} />
                        </td>
                        <td>{payment.month}</td>
                        <td>{new Date(payment.date).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
