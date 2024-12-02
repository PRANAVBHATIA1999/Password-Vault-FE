import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-placeholder">Your Logo</div>
        <h1 className="home-title">Welcome to Secure Password Vault</h1>
        <p className="home-subtitle">
          Your secure, user-friendly solution to manage passwords efficiently within your organization.
        </p>
      </header>

      <section className="home-section">
        <h2>About Secure Password Vault</h2>
        <p>
          In an era where digital accounts are essential, keeping passwords safe and accessible is crucial. 
          Our Secure Password Vault simplifies this by securely storing, managing, and retrieving passwords for organizations and their employees. 
          Designed for enterprises, it enables administrators to monitor access and set precise controls for their workforce.
        </p>
        <div className="feature-images">
          <div className="feature-placeholder">[Insert Image 1]</div>
          <div className="feature-placeholder">[Insert Image 2]</div>
        </div>
      </section>

      <section className="home-section">
        <h2>Core Features</h2>
        <ul>
          <li>
            <strong>Geo-Location Access Control:</strong> Admins can set specific geographical zones where password access is allowed. Employees outside these zones won't be able to access the vault, ensuring added security.
          </li>
          <li>
            <strong>Access Management:</strong> View and monitor which employee has access to which application, enhancing visibility and control.
          </li>
          <li>
            <strong>Client-Side Encryption:</strong> Passwords are encrypted before leaving the user’s device, ensuring complete security during transmission.
          </li>
        </ul>
      </section>

      <footer className="home-footer">
        <p>Join enterprises worldwide in securing their digital assets with Secure Password Vault.</p>
      </footer>
    </div>
  );
};

export default Home;
