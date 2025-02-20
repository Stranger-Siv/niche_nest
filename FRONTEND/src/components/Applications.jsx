import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaTrash, FaBriefcase } from "react-icons/fa";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
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
        <h2>No Applications</h2>
        <p>You have no applications from job seekers yet.</p>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2 className="page-title">Applications For Your Posted Jobs</h2>
      <div className="applications-list">
        {applications.map((application) => (
          <div className="application-card" key={application._id}>
            <div className="application-header">
              <div className="job-title-section">
                <FaBriefcase className="icon" />
                <h3>{application.jobInfo.jobTitle}</h3>
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

            <div className="application-content">
              <div className="applicant-details">
                <div className="detail-item">
                  <FaUser className="icon" />
                  <div>
                    <label>Applicant Name</label>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;