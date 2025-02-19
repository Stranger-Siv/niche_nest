import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  const companies = [
    { id: 1, name: "Netflix", logo: "N" },
    { id: 2, name: "Google", logo: "G" },
    { id: 3, name: "Drive", logo: "D" },
    { id: 4, name: "Figma", logo: "F" },
    { id: 5, name: "Slack", logo: "S" },
    { id: 6, name: "Hubspot", logo: "H" },
  ]

  const features = [
    {
      id: 1,
      title: "For Job Seekers",
      description: "Find your dream job from thousands of opportunities",
      benefits: [
        "Access to top companies",
        "Easy application process",
        "Track your applications",
        "Professional profile building"
      ]
    },
    {
      id: 2,
      title: "For Employers",
      description: "Connect with talented professionals for your company",
      benefits: [
        "Post unlimited jobs",
        "Advanced candidate filtering",
        "Direct messaging system",
        "Analytics dashboard"
      ]
    }
  ]

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Find Your Dream Job or
            <span className="highlight"> Hire Top Talent</span>
          </h1>
          <p>Your one-stop platform for all professional hiring needs</p>
          
          <div className="hero-buttons">
            <Link to="/jobs" className="primary-btn">
              Find Jobs
            </Link>
            <Link to="/post-job" className="secondary-btn">
              Post a Job
            </Link>
          </div>

          <div className="companies-section">
            <p>Trusted by leading companies</p>
            <div className="company-logos">
              {companies.map(company => (
                <div key={company.id} className="company-logo">
                  {company.logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="job-cards-preview">
            <div className="preview-card active">
              <div className="card-header">
                <div className="company-info">
                  <span className="logo">G</span>
                  <div>
                    <h3>UI/UX Designer</h3>
                    <p>Google Inc.</p>
                  </div>
                </div>
                <span className="salary">$80k-120k</span>
              </div>
            </div>
            <div className="preview-card">
              <div className="card-header">
                <div className="company-info">
                  <span className="logo">M</span>
                  <div>
                    <h3>Product Manager</h3>
                    <p>Microsoft</p>
                  </div>
                </div>
                <span className="salary">$90k-140k</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Choose Your Path</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className="benefits-list">
                {feature.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <Link 
                to={feature.id === 1 ? "/jobs" : "/post-job"} 
                className="feature-btn"
              >
                Get Started →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>10k+</h3>
          <p>Active Job Listings</p>
        </div>
        <div className="stat-card">
          <h3>5k+</h3>
          <p>Companies Hiring</p>
        </div>
        <div className="stat-card">
          <h3>1M+</h3>
          <p>Job Seekers</p>
        </div>
      </div>
    </div>
  )
}

export default Home