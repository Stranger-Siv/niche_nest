import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaFileAlt, FaBriefcase, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deleteApplication(id));
    }
  };

  if (loading) return <Spinner />;

  if (applications && applications.length <= 0) {
    return (
      <div className="empty-state">
        <FaBriefcase className="empty-icon" />
        <h2>No Applications Found</h2>
        <p>You haven't applied to any jobs yet.</p>
        <Link to="/jobs" className="browse-jobs-btn">Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaBriefcase className="header-icon" />
        <h2>My Applications</h2>
      </div>

      <div className="applications-grid">
        {applications.map((application) => (
          <div className="application-card" key={application._id}>
            <div className="application-header">
              <h3>{application.jobInfo.jobTitle}</h3>
              <span className="company-name">{application.jobInfo.companyName}</span>
            </div>

            <div className="application-details">
              <div className="detail-item">
                <FaUser className="icon" />
                <div>
                  <label>Name</label>
                  <span>{application.jobSeekerInfo.name}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaEnvelope className="icon" />
                <div>
                  <label>Email</label>
                  <span>{application.jobSeekerInfo.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaPhone className="icon" />
                <div>
                  <label>Phone</label>
                  <span>{application.jobSeekerInfo.phone}</span>
                </div>
              </div>

              <div className="detail-item">
                <FaMapMarkerAlt className="icon" />
                <div>
                  <label>Address</label>
                  <span>{application.jobSeekerInfo.address}</span>
                </div>
              </div>
            </div>

            <div className="cover-letter">
              <h4>Cover Letter</h4>
              <p>{application.jobSeekerInfo.coverLetter}</p>
            </div>

            <div className="application-actions">
              <Link
                to={application.jobSeekerInfo.resume.url}
                className="view-resume-btn"
                target="_blank"
              >
                <FaFileAlt className="icon" />
                View Resume
              </Link>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteApplication(application._id)}
              >
                <FaTrash className="icon" />
                Delete Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;