import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaBriefcase, FaBuilding, FaDollarSign, FaTrash } from "react-icons/fa";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id));
    }
  };

  if (loading) return <Spinner />;
  
  if (myJobs && myJobs.length <= 0) {
    return (
      <div className="empty-state">
        <h2>No Jobs Posted</h2>
        <p>You haven't posted any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="my-jobs-container">
      <h2 className="page-title">My Posted Jobs</h2>
      <div className="jobs-grid">
        {myJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <span className="job-niche">{job.jobNiche}</span>
            </div>

            <div className="job-card-details">
              <div className="detail-item">
                <FaBuilding className="icon" />
                <span>{job.companyName}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="icon" />
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <FaBriefcase className="icon" />
                <span>{job.jobType}</span>
              </div>
              <div className="detail-item">
                <FaDollarSign className="icon" />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="job-card-content">
              <div className="content-section">
                <h4>Introduction</h4>
                <p>{job.introduction}</p>
              </div>
              <div className="content-section">
                <h4>Qualifications</h4>
                <p>{job.qualifications}</p>
              </div>
              <div className="content-section">
                <h4>Responsibilities</h4>
                <p>{job.responsibilities}</p>
              </div>
              {job.offers && (
                <div className="content-section">
                  <h4>What We Offer</h4>
                  <p>{job.offers}</p>
                </div>
              )}
            </div>

            <button 
              className="delete-btn"
              onClick={() => handleDeleteJob(job._id)}
            >
              <FaTrash className="icon" />
              Delete Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;