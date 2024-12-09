import React from "react";
import { useState, useEffect } from "react";
import { getJobs } from "../../services";
const Home = () => {
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
  console.log(jobs);
  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        jobs.map((job) => (
          <div key={job._id}>
            <h2>{job.jobPosition}</h2>
            <p>{job.jobDescription}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
