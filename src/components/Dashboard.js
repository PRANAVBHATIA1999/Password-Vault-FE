import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [vaultData, setVaultData] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    appURL: '',
    appUserName: '',
    appPassword: '',
  });

  // Fetch vault data
  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/vault/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVaultData(response.data);
      } catch (error) {
        console.error('Error fetching vault data:', error);
      }
    };

    fetchVaultData();
  }, []);

  // Toggle password visibility and log the event
  const togglePasswordVisibility = async (entry) => {
    const { _id, appName, appUserName } = entry;

    // Toggle visibility state
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));

    // Log the password view event if making the password visible
    if (!visiblePasswords[_id]) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:3000/api/vault/create',
          {
            userName: appUserName,
            appName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`Log created for ${appUserName} viewing ${appName}`);
      } catch (error) {
        console.error('Error logging password view:', error);
      }
    }
  };

  // Toggle Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.post('http://localhost:3000/api/vault/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('App added successfully!');
      setShowModal(false); // Close modal after success
      setFormData({
        appName: '',
        appURL: '',
        appUserName: '',
        appPassword: '',
      });

      // Refresh the table data
      setVaultData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error('Error adding app:', error);
      alert('Failed to add app. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Password Vault</h1>
      <table className="vault-table">
        <thead>
          <tr>
            <th>App Name</th>
            <th>URL</th>
            <th>User Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {vaultData.map((entry) => (
            <tr
              key={entry._id}
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 50%, 85%)`,
              }}
            >
              <td>{entry.appName}</td>
              <td>
                <a href={entry.appURL} target="_blank" rel="noopener noreferrer">
                  {entry.appURL}
                </a>
              </td>
              <td>{entry.appUserName}</td>
              <td>
                <div className="password-container">
                  {visiblePasswords[entry._id]
                    ? entry.appPassword
                    : '********'}
                  <button
                    className="toggle-password"
                    onClick={() => togglePasswordVisibility(entry)}
                  >
                    {visiblePasswords[entry._id] ? '🙈' : '👁️'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-app-button" onClick={toggleModal}>
        Add New App
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New App</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="appName">App Name</label>
              <input
                type="text"
                id="appName"
                name="appName"
                value={formData.appName}
                onChange={handleChange}
                required
              />

              <label htmlFor="appURL">App URL</label>
              <input
                type="url"
                id="appURL"
                name="appURL"
                value={formData.appURL}
                onChange={handleChange}
                required
              />

              <label htmlFor="appUserName">App User Name</label>
              <input
                type="text"
                id="appUserName"
                name="appUserName"
                value={formData.appUserName}
                onChange={handleChange}
                required
              />

              <label htmlFor="appPassword">App Password</label>
              <input
                type="password"
                id="appPassword"
                name="appPassword"
                value={formData.appPassword}
                onChange={handleChange}
                required
              />

              <button type="submit" className="submit-button">
                Add App
              </button>
              <button type="button" className="cancel-button" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
