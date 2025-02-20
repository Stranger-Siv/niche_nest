import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegBell, FaRegBookmark, FaRegUser, FaBriefcase } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="NicheNest">
          <div className="logo-wrapper">
            <span className="logo-icon">N</span>
            <div className="logo-dot"></div>
          </div>
          <span className="logo-text">NicheNest</span>
        </Link>

        {/* Auth Section */}
        <div className="nav-auth">
          <Link to="/jobs" className="jobs-link">
            <FaBriefcase className="nav-icon" />
            <span>Jobs</span>
          </Link>
          {isAuthenticated ? (
            <div className="nav-user-section">              
              <div className="divider"></div>
              <Link to="/dashboard" className="nav-profile" title="Dashboard">
                <span className="profile-icon">{user?.name?.charAt(0)}</span>
              </Link>
            </div>
          ) : (
            <div className="nav-user-section">
              <div className="divider"></div>
              <Link to="/login" className="sign-in-btn">
                <FaRegUser className="nav-icon" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
