import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createJob, getJobById, updateJob } from "../../services/index";
import "./NewJob.css";

export default function NewJob() {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      // setIsEdit(true);
    }
  }, [id]);

  const [jobformData, setJobformData] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    salary: "",
    jobType: "",
    remoteOrOffice: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: [],
    additionalInfo: "",
  });

  // useEffect(() => {
  //   if (isEdit && id) {
  //     const fetchJob = async () => {
  //       const res = await getJobById(id);
  //       if (res.status === 200) {
  //         const data = await res.json();
  //         setJobformData(data);
  //       } else {
  //         console.log(res);
  //       }
  //     };
  //     fetchJob();
  //   }
  // }, [isEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobformData({ ...jobformData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    setJobformData({
      ...jobformData,
      skillsRequired: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    const res = await createJob(jobformData);
    if (res.status === 200) {
      alert(`Job created successfully!`);
      navigate("/home");
    } else if (res.status === 401) {
      alert(`Login to create Job`);
    } else {
      console.error(res);
      alert("An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-section">
          <h1 className="form-title">
            {"Add Job Description"}
          </h1>
          <form onSubmit={handleCreateJob} className="form">
            <input
              type="text"
              name="companyName"
              value={jobformData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your company name here"
              className="input"
              required
            />
            <input
              type="text"
              name="logoUrl"
              value={jobformData.logoUrl}
              onChange={handleInputChange}
              placeholder="Add logo URL"
              className="input"
              required
            />
            <input
              type="text"
              name="jobPosition"
              value={jobformData.jobPosition}
              onChange={handleInputChange}
              placeholder="Enter job position"
              className="input"
              required
            />
            <input
              type="number"
              name="salary"
              value={jobformData.salary}
              onChange={handleInputChange}
              placeholder="Monthly salary"
              className="input"
              required
            />
            <select
              name="jobType"
              value={jobformData.jobType}
              onChange={handleInputChange}
              className="select"
              required
            >
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
            <select
              name="remoteOrOffice"
              value={jobformData.remoteOrOffice}
              onChange={handleInputChange}
              className="select"
              required
            >
              <option value="">Remote/Office</option>
              <option value="remote">Remote</option>
              <option value="office">Office</option>
            </select>
            <input
              type="text"
              name="location"
              value={jobformData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="input"
              required
            />
            <textarea
              name="jobDescription"
              value={jobformData.jobDescription}
              onChange={handleInputChange}
              placeholder="Job description"
              className="textarea"
              required
            ></textarea>
            <textarea
              name="aboutCompany"
              value={jobformData.aboutCompany}
              onChange={handleInputChange}
              placeholder="About company"
              className="textarea"
              required
            ></textarea>
            <input
              type="text"
              name="skillsRequired"
              value={jobformData.skillsRequired.join(", ")}
              onChange={handleSkillsChange}
              placeholder="Skills required (comma separated)"
              className="input"
              required
            />
            <textarea
              name="additionalInfo"
              value={jobformData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Additional information"
              className="textarea"
            ></textarea>
            <div className="button-group">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button type="submit" className="submit-button">
                 Add Job
              </button>
            </div>
          </form>
        </div>
        <div className="design-section">
          <h2 className="design-title">Recruiter add job details here</h2>
        </div>
      </div>
    </div>
  );
}
