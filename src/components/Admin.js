import React from 'react';
import '../styles/Admin.css';

const Admin = () => {
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
          Use the menu on the left to configure settings and manage application controls.
        </p>
      </main>
    </div>
  );
};

export default Admin;
