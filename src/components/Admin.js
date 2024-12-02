import React, { useState } from 'react';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [message, setMessage] = useState('');

  const users = ['Pranav', 'Sharmeen', 'Preeti', 'Alish', 'Erick', 'Leonard', 'Tanmay', 'Walter', 'Hank']; // Dummy user data
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Dallas']; // Dummy location data

  const handleSave = () => {
    if (selectedUser && selectedLocation) {
      setMessage(
        `Access for ${selectedUser} has been restricted to ${selectedLocation}.`
      );
    } else {
      setMessage('Please select both a user and a location.');
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-item">Settings</div>
        <div className="sidebar-divider"></div>
        {/* Additional sidebar items can be added here */}
      </aside>
      <main className="admin-content">
        <h1>Welcome to Admin Controls</h1>
        <p>
          Use the menu on the left to configure settings and manage application
          controls.
        </p>
        <div className="geo-control">
          <h2>Control User Access by Geo Location</h2>
          <p>
            Restrict user access to passwords based on their geographical
            location. This feature ensures that users can only access sensitive
            data from authorized locations.
          </p>
          <div className="geo-form">
            <label htmlFor="user-select">Select User:</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">--Select User--</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            <label htmlFor="location-select">Select Location:</label>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">--Select Location--</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
