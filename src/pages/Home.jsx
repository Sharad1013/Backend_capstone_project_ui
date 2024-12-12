import React, { useState, useEffect } from "react";
import { getJobs, deleteJob } from "../../services";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
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
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    const res = await deleteJob(id);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      alert(`Job deleted successfully`);
      fetchJobs();
    } else if (res.status === 401) {
      alert(`you are not authorized to delete this job`);
    } else {
      console.log(res);
      alert(`error`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">Jobfinder</h1>
        <div className="auth-buttons">
          {!token ? (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <button className="login-btn" onClick={() => handleLogout()}>
              Logout
            </button>
          )}
          {!token ? (
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          ) : (
            "  Hello! Recruiter"
          )}
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
          <button className="add-btn" onClick={() => navigate("/newJob")}>
            + Add Job
          </button>
        </div>
      </div>

      <div className="job-list">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-inner">
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
              </div>
              <div className="buttons">
                <button className="view-details-button">View Details</button>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/editJob/${job._id}`)}
                >
                  Edit
                </button>
                <button
                  className="view-details-button"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
