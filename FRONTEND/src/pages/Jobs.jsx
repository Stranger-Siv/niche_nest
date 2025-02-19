import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaBookmark, FaStar, FaSync } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../styles/Jobs.css';

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

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
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs-container">
          <div className="jobs-layout">
            {/* Left Sidebar Filter */}
            <div className="filter-sidebar">
              <h2 className="filter-title">Filter</h2>
              
              <div className="filter-group">
                <h3>Category</h3>
                <select className="select-input">
                  <option>Anytime</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <h3>Job Type</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Full-time</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Internship</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Freelance</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Volunteer</span>
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Niche</h3>
                <div className="radio-group">
                  {nichesArray.map((niche) => (
                    <label key={niche} className="radio-label">
                      <input
                        type="radio"
                        name="niche"
                        value={niche}
                        checked={selectedNiche === niche}
                        onChange={() => handleNicheChange(niche)}
                      />
                      <span>{niche}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Expected salary</h3>
                <div className="salary-range">
                  <span>₹10K</span>
                  <input type="range" min="10000" max="100000" step="1000" />
                  <span>₹100K</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
              <div className="header-section">
                <h1>Find your dream job here</h1>
                <p>Join us to find your dream job in various skills, with many additional benefits</p>
              </div>

              <div className="search-section">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search your job"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button onClick={handleSearch} className="search-button">
                  Search
                </button>
                <button className="refresh-button">
                  <FaSync />
                </button>
              </div>

              <div className="job-cards">
                {jobs && jobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <div className="job-card-header">
                      <div className="company-info">
                        <div className="company-logo">
                          {job.companyName[0]}
                        </div>
                        <div className="job-title-section">
                          <h3>{job.title}</h3>
                          <p>{job.companyName}</p>
                        </div>
                      </div>
                      <button className="bookmark-button">
                        <FaBookmark />
                      </button>
                    </div>

                    <div className="job-details">
                      <div className="job-meta">
                        <span>Location: {job.location}</span>
                        <span>Salary: ₹{job.salary}</span>
                      </div>
                      
                      <div className="job-tags">
                        {job.hiringMultipleCandidates === "Yes" && (
                          <span className="tag">Multiple Openings</span>
                        )}
                        <span className="tag">Full Time</span>
                      </div>
                    </div>

                    <div className="job-card-footer">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="posted-date">Posted: {job.jobPostedOn.substring(0, 10)}</p>
                      <Link 
                        to={`/post/application/${job._id}`}
                        className="apply-button"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;