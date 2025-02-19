import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="Niche-Nest">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lamar</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {["jobs", "contact"].map((item) => (
            <NavLink key={item} to={`/${item}`} className="nav-link" activeClassName="active-link">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </div>

        {/* Authentication Section */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <Link to="/dashboard" className="nav-profile" aria-label="User Dashboard">
              <span className="profile-icon">{user?.name?.charAt(0)}</span>
              <span className="profile-name">{user?.name}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="sign-in-btn">Sign In</Link>
              <Link to="/register" className="get-started-btn">Get Started →</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
