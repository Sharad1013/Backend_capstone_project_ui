import React, { useState, useEffect } from "react";
import { getJobs } from "../../services";
import "./Home.css"; // Assuming this is the linked CSS file
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const res = await getJobs();
      const data = await res.json();
      if (res.status === 200) {
        setJobs(data);
      } else {
        console.log(res);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">Jobfinder</h1>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Type any job title"
          className="search-input"
        />
        {/* <div className="filters">
          <div className="filter-tag">
            Frontend <span className="close-btn">X</span>
          </div>
          <div className="filter-tag">
            CSS <span className="close-btn">X</span>
          </div>
          <div className="filter-tag">
            JavaScript <span className="close-btn">X</span>
          </div>
        </div> */}
        <div className="search-buttons">
          <button className="apply-btn">Apply Filter</button>
          <button className="clear-btn">Clear</button>
        </div>
      </div>

      <div className="job-list">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <img
                src={job.logoUrl || "default-logo.png"}
                alt="Company Logo"
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />
              <div className="job-details">
                <h3>{job.jobPosition}</h3>
                <p>{job.jobDescription}</p>
                <p>
                  <strong>Location:</strong> {job.location}{" "}
                  <strong>Salary:</strong> ₹{job.salary}
                </p>
                <p>
                  <strong>Type:</strong> {job.jobType} {job.remoteOrOffice}
                </p>
                <div className="job-tags">
                  {job.skillsRequired.map((skill, index) => (
                    <span key={index} className="job-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="view-details-button">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
