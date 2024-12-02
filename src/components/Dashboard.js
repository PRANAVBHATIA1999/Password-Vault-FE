import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [vaultData, setVaultData] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

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

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
          {vaultData.map((entry, index) => (
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
                    onClick={() => togglePasswordVisibility(entry._id)}
                  >
                    {visiblePasswords[entry._id] ? '🙈' : '👁️'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
