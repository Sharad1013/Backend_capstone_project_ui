import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../../services/index";
import "./EditJob.css";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      const fetchJob = async () => {
        const res = await getJobById(id);
        if (res.status === 200) {
          const data = await res.json();
          setJobformData(data);
        } else {
          console.log(res);
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobformData({ ...jobformData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setJobformData({ ...jobformData, skillsRequired: skills });
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Please log in again.");
      navigate("/login");
      return;
    }
    try {
      const res = await updateJob(id, jobformData);
      if (res.status === 200) {
        alert("Job updated successfully");
        navigate("/home");
      } else {
        console.error("Failed to update job", res);
        alert("Error updating job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="edit-job-container">
      <h1 className="edit-job-title">Edit Job</h1>
      <form className="edit-job-form" onSubmit={handleUpdateJob}>
        <input
          className="edit-job-input"
          type="text"
          name="companyName"
          value={jobformData.companyName}
          onChange={handleInputChange}
          placeholder="Enter company name"
        />
        <input
          className="edit-job-input"
          type="text"
          name="logoUrl"
          value={jobformData.logoUrl}
          onChange={handleInputChange}
          placeholder="Enter logo URL"
        />
        <input
          className="edit-job-input"
          type="text"
          name="jobPosition"
          value={jobformData.jobPosition}
          onChange={handleInputChange}
          placeholder="Enter job position"
        />
        <input
          className="edit-job-input"
          type="number"
          name="salary"
          value={jobformData.salary}
          onChange={handleInputChange}
          placeholder="Enter salary"
        />
        <select
          className="edit-job-select"
          name="jobType"
          value={jobformData.jobType}
          onChange={handleInputChange}
        >
          <option value="">Select job type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="freelance">Freelance</option>
        </select>
        <select
          className="edit-job-select"
          name="remoteOrOffice"
          value={jobformData.remoteOrOffice}
          onChange={handleInputChange}
        >
          <option value="">Select work mode</option>
          <option value="remote">Remote</option>
          <option value="office">Office</option>
        </select>
        <input
          className="edit-job-input"
          type="text"
          name="location"
          value={jobformData.location}
          onChange={handleInputChange}
          placeholder="Enter location"
        />
        <textarea
          className="edit-job-textarea"
          name="jobDescription"
          value={jobformData.jobDescription}
          onChange={handleInputChange}
          placeholder="Enter job description"
        ></textarea>
        <textarea
          className="edit-job-textarea"
          name="aboutCompany"
          value={jobformData.aboutCompany}
          onChange={handleInputChange}
          placeholder="Enter information about the company"
        ></textarea>
        <input
          className="edit-job-input"
          type="text"
          name="skillsRequired"
          value={jobformData.skillsRequired.join(", ")}
          onChange={handleSkillsChange}
          placeholder="Enter skills required (comma-separated)"
        />
        <textarea
          className="edit-job-textarea"
          name="additionalInfo"
          value={jobformData.additionalInfo}
          onChange={handleInputChange}
          placeholder="Enter additional information"
        ></textarea>
        <button className="edit-job-button" type="submit">Update Job</button>
      </form>
    </div>
  );
}

