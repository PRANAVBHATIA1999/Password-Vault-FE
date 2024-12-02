import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/vault/logs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch logs. Please try again.');
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading logs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>User Access Logs</h2>
      <table className="logs-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>App Name</th>
            <th>Accessed At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.userName}</td>
              <td>{log.appName}</td>
              <td>{new Date(log.accessedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
