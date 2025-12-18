import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import FindJobs from "./FindJobs.jsx";

export default function App() {
  const [jobResults, setJobResults] = useState([]);

  // on initial render, should call getData method
  // getData method sets state of jobResults Array
  useEffect(() => {
    getData();
  }, []);

  const getData = (category) => {
    axios
      // if category is undefined ?? is used to check that, then it sets category to be "nothing"
      // without ?? category being undefined literally returns '/findjobs/undefined' instead of '/findjobs/'
      .get(`/findjobs/${category ?? ""}`)
      .then((jobsObj) => {
        const jobs = jobsObj.data;
        setJobResults(jobs);
      })
      .catch((err) => {
        console.error("Failed to GET jobs from endpoint", err);
      });
  };

  return <FindJobs jobs={jobResults} />;
}
