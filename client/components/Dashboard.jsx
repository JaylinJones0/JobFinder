import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import JobList from "./JobList.jsx";

export default function Dashboard() {
  //set init state of jobs
  const [jobs, setJobs] = useState([]);
  console.log(jobs);

  //on init render or on change of jobs
  useEffect(() => {
    //invoke fn to get all jobs from backend
    getJobs();
  }, []);

  //function gets all job data from backend
  const getJobs = () => {
    //make a call to endpoint to get all jobs
    axios.get("/api/jobs")
      //we get jobs array in response data
      .then((res) => {
        //store the jobs array in state
        setJobs(res.data);
        //error handling
      }).catch((err) => {
        console.log(err);
      });
  };

  //render jobs to client
  //map over jobs array.
  //use id as unique key for each job
  //extract each job title and status and render to page
  return (
    <>
      {jobs.map((job) => (
        <div key={job._id}>
          <p> {job.title}</p>
          <p> {job.status}</p>
        </div>
      ))}
    </>
  );
}
