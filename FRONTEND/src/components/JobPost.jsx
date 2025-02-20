import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaTags, FaUsers, FaGlobe, FaFileAlt } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "Surat",
    "Ahmedabad",
    "Gurugram",
    "Hyderabad",
    "Telengana",
    "Pune",
    "Indore",
    "Kolkata",
    "Banglore",
    "Bhubeneshwar",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobTypes = [
    "Full-time",
    "Part-time"
  ];

  const handlePostJob = () => {
    const jobData = {
      title,
      jobType,
      location,
      companyName,
      introduction,
      responsibilities,
      qualifications,
      offers,
      jobNiche,
      salary,
      hiringMultipleCandidates,
      personalWebsiteTitle,
      personalWebsiteUrl,
    };
    dispatch(postJob(jobData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      navigate("/my/jobs");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaBriefcase className="header-icon" />
        <h2>Post a New Job</h2>
      </div>

      <div className="profile-card">
        <div className="form-grid">
          <div className="form-group">
            <label>
              <FaBriefcase className="icon" /> Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter job title"
            />
          </div>

          <div className="form-group">
            <label>
              <FaBuilding className="icon" /> Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="form-group">
            <label>
              <FaTags className="icon" /> Job Type
            </label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Select Job Type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="icon" /> Location
            </label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select Location</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaTags className="icon" /> Job Niche
            </label>
            <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
              <option value="">Select Job Niche</option>
              {nichesArray.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaMoneyBillWave className="icon" /> Salary Range
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., 50000 - 80000"
            />
          </div>

          <div className="form-group full-width">
            <label>
              <FaFileAlt className="icon" /> Introduction
            </label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="Brief introduction about the job"
              rows={4}
            />
          </div>

          <div className="form-group full-width">
            <label>
              <FaFileAlt className="icon" /> Responsibilities
            </label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Key responsibilities of the role"
              rows={4}
            />
          </div>

          <div className="form-group full-width">
            <label>
              <FaFileAlt className="icon" /> Qualifications
            </label>
            <textarea
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              placeholder="Required qualifications"
              rows={4}
            />
          </div>

          <div className="form-group full-width">
            <label>
              <FaFileAlt className="icon" /> What We Offer
            </label>
            <textarea
              value={offers}
              onChange={(e) => setOffers(e.target.value)}
              placeholder="Benefits and perks"
              rows={4}
            />
          </div>

          <div className="form-group">
            <div className="label-with-info">
              <label>
                <FaUsers className="icon" /> Hiring Multiple?
              </label>
              <span className="info-tag">
                <CiCircleInfo /> Optional
              </span>
            </div>
            <select
              value={hiringMultipleCandidates}
              onChange={(e) => setHiringMultipleCandidates(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <div className="label-with-info">
              <label>
                <FaGlobe className="icon" /> Website Name
              </label>
              <span className="info-tag">
                <CiCircleInfo /> Optional
              </span>
            </div>
            <input
              type="text"
              value={personalWebsiteTitle}
              onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
              placeholder="Company website name"
            />
          </div>

          <div className="form-group">
            <div className="label-with-info">
              <label>
                <FaGlobe className="icon" /> Website URL
              </label>
              <span className="info-tag">
                <CiCircleInfo /> Optional
              </span>
            </div>
            <input
              type="url"
              value={personalWebsiteUrl}
              onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
              placeholder="Company website URL"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            className="submit-btn"
            onClick={handlePostJob}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPost;