import React from 'react';
import './DefaultComponent.css';

const DefaultComponent = () => {
  return (
    <div className="default-component">
      <h1>Welcome to Our Dashboard</h1>
      <p>Explore our powerful tools and features designed to streamline your workflow.</p>
      
      <div className="feature-grid">
        <div className="feature-card">
          <h2>Report Scheduler</h2>
          <p>Automate your reporting process with our advanced scheduling system. Create and manage jobs effortlessly.</p>
        </div>
        <div className="feature-card">
          <h2>Seasonal Information</h2>
          <p>Stay up-to-date with crucial seasonal data and trends affecting your business operations.</p>
        </div>
        <div className="feature-card">
          <h2>User Recertification</h2>
          <p>Manage user credentials and certifications with ease. Create and monitor recertification jobs.</p>
        </div>
        <div className="feature-card">
          <h2>Outage Management</h2>
          <p>Efficiently handle and track system outages. Create outage reports and view comprehensive lists.</p>
        </div>
      </div>
    </div>
  );
};

export default DefaultComponent;
