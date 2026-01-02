import React from "react";
import { Link } from "react-router";
import ExampleJobs from "./ExampleJobs.jsx";
export default function Home({ jobs, getJobListings }) {

  return (
    <div>
      <h1>Home Page (WIP)</h1>
      <Link to="/findjobs">
      <button>
       Find Jobs
      </button>
      </Link>
      <div>
        <Link to="/signin">
        <button>
          Signin w/ Google
        </button>
        </Link>
      </div>
    </div>
  );
}
