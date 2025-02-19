import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <Link to="/" className="footer-brand">
            <span className="footer-logo-icon">L</span>
            <span className="footer-logo-text">Lamar</span>
          </Link>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-list">
            <li>Vadodara, Gujarat</li>
            <li>
              <a href="mailto:programmersiv21@gmail.com" className="footer-link">
                programmersiv21@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+918866209083" className="footer-link">
                +91 8866209083
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-list">
            <li>
              <Link to="/" className="footer-link">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="footer-link">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard" className="footer-link">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="footer-social">
            {[
              { icon: <FaSquareXTwitter />, name: "Twitter (X)", url: "https://twitter.com" },
              { icon: <FaSquareInstagram />, name: "Instagram", url: "https://instagram.com" },
              { icon: <FaYoutube />, name: "YouTube", url: "https://youtube.com" },
              { icon: <FaLinkedin />, name: "LinkedIn", url: "https://linkedin.com" },
            ].map(({ icon, name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                {icon} <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} All Rights Reserved By NicheNest
      </div>
    </footer>
  );
};

export default Footer;
