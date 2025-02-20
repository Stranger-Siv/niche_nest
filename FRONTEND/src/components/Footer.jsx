import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>NicheNest</h4>
          <p>Connecting talent with opportunities across the nation for every skill level.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@nichenest.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NicheNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 