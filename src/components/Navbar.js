import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import logo from '../assets/logo.png';

import '../styles/Navbar.css';

const Navbar = () => {
  const { user } = useSelector((state) => state.user); // Get user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userType = localStorage.getItem('userType'); // Retrieve userType from localStorage

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Redirect to dashboard page
  };

  const handleAdminControls = () => {
    navigate('/admin'); // Redirect to admin page
  };

  const handleAdminDashboard = () => {
    navigate('/admindashboard'); // Redirect to admin dashboard page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img
          src={logo} // Replace this with the path to your actual logo
          alt="Access Avengers Logo"
          className="navbar-logo-img"
        />
        <h1 className="navbar-logo">
          <Link to="/">Access Avengers</Link>
        </h1>
      </div>
      <ul className="navbar-links">
        {user ? (
          <>
            {userType === 'admin' && (
              <li>
                <button className="dashboard-button" onClick={handleAdminControls}>
                  Admin Controls
                </button>
              </li>
            )}

            {userType === 'admin' && (
              <li>
                <button className="dashboard-button new-clr" onClick={handleAdminDashboard}>
                  Admin Dashboard
                </button>
              </li>
            )}

            {userType === 'employee' && (
              <li>
                <button className="dashboard-button" onClick={handleDashboard}>
                  Dashboard
                </button>
              </li>
            )}

            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
