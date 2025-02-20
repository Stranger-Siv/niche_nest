import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaMoneyBillWave, 
  FaBriefcase, 
  FaBuilding,
  FaUpload,
  FaCheckCircle,
  FaListUl,
  FaGift
} from "react-icons/fa";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.applications);

  const { jobId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  return (
    <div className="dashboard-container">
      <div className="application-layout">
        {/* Job Details Card */}
        <div className="profile-card job-details">
          <div className="job-header">
            <h3>{singleJob.title}</h3>
            <div className="company-info">
              <FaBuilding className="icon" />
              <span>{singleJob.companyName}</span>
            </div>
            <div className="job-meta">
              <div className="meta-item">
                <FaMapMarkerAlt className="icon" />
                <span>{singleJob.location}</span>
              </div>
              <div className="meta-separator"></div>
              <div className="meta-item">
                <FaMoneyBillWave className="icon" />
                <span>₹{singleJob.salary} a month</span>
              </div>
              <div className="meta-separator"></div>
              <div className="meta-item">
                <FaBriefcase className="icon" />
                <span>{singleJob.jobType}</span>
              </div>
            </div>
          </div>

          <div className="job-content">
            <div className="job-section">
              <h4>
                <FaFileAlt className="section-icon" />
                Job Description
              </h4>
              <p>{singleJob.introduction}</p>
            </div>

            {singleJob.qualifications && (
              <div className="job-section">
                <h4>
                  <FaCheckCircle className="section-icon" />
                  Qualifications
                </h4>
                <ul className="job-list">
                  {singleJob.qualifications.split(". ").filter(Boolean).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {singleJob.responsibilities && (
              <div className="job-section">
                <h4>
                  <FaListUl className="section-icon" />
                  Responsibilities
                </h4>
                <ul className="job-list">
                  {singleJob.responsibilities.split(". ").filter(Boolean).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {singleJob.offers && (
              <div className="job-section">
                <h4>
                  <FaGift className="section-icon" />
                  What We Offer
                </h4>
                <ul className="job-list">
                  {singleJob.offers.split(". ").filter(Boolean).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Application Form */}
        <div className="profile-card application-form">
          <div className="form-header">
            <FaBriefcase className="header-icon" />
            <h2>Apply for this position</h2>
          </div>

          <div className="form-content">
            <div className="form-section">
              <div className="form-group">
                <label>
                  <FaUser className="icon" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope className="icon" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone className="icon" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="icon" /> Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {user && user.role === "Job Seeker" && (
              <div className="form-section">
                <div className="form-group">
                  <label>
                    <FaFileAlt className="icon" /> Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Write your cover letter"
                    rows={6}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaUpload className="icon" /> Resume
                  </label>
                  <div className="file-upload">
                    <input
                      type="file"
                      onChange={(e) => setResume(e.target.files[0])}
                      accept=".pdf,.doc,.docx"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="upload-label">
                    </label>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && user.role === "Job Seeker" && (
              <div className="form-actions">
                <button
                  className="submit-btn"
                  onClick={handlePostApplication}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostApplication;
