import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaUserTag, FaCalendarAlt } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaUser className="header-icon" />
        <h2>My Profile</h2>
      </div>

      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-item">
            <FaUser className="icon" />
            <div>
              <label>Full Name</label>
              <span>{user?.name}</span>
            </div>
          </div>

          <div className="profile-item">
            <FaEnvelope className="icon" />
            <div>
              <label>Email Address</label>
              <span>{user?.email}</span>
            </div>
          </div>

          <div className="profile-item">
            <FaPhone className="icon" />
            <div>
              <label>Phone Number</label>
              <span>{user?.phone || "Not provided"}</span>
            </div>
          </div>

          <div className="profile-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <label>Address</label>
              <span>{user?.address || "Not provided"}</span>
            </div>
          </div>

          {user?.coverLetter && (
            <div className="profile-item full-width">
              <FaFileAlt className="icon" />
              <div>
                <label>Cover Letter</label>
                <span className="cover-letter-text">{user.coverLetter}</span>
              </div>
            </div>
          )}

          <div className="profile-item">
            <FaUserTag className="icon" />
            <div>
              <label>Role</label>
              <span>{user?.role}</span>
            </div>
          </div>

          <div className="profile-item">
            <FaCalendarAlt className="icon" />
            <div>
              <label>Joined On</label>
              <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {user?.niches && (
            <div className="profile-item full-width">
              <div className="niches-section">
                <label>Professional Niches</label>
                <div className="niche-tags">
                  {user.niches.firstNiche && (
                    <span className="niche-tag">{user.niches.firstNiche}</span>
                  )}
                  {user.niches.secondNiche && (
                    <span className="niche-tag">{user.niches.secondNiche}</span>
                  )}
                  {user.niches.thirdNiche && (
                    <span className="niche-tag">{user.niches.thirdNiche}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;