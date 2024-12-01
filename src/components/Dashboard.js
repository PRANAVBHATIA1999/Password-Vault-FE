import React from 'react';
import { useSelector } from 'react-redux';

import '../styles/Dashboard.css';

const Dashboard = () => {
  // Access the user state from Redux
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dashboard-container">
      <h1>Welcome {user ? user.name : 'Guest'}...</h1>
    </div>
  );
};

export default Dashboard;
