import React, { useEffect } from "react";
import { Link } from "react-router";
import { Stack, Box, Typography, Button, Icon } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ExampleJobs from "./ExampleJobs.jsx";
import findJobs from "../src/assets/find-jobs.png";
import dashboard from "../src/assets/dashboard.png";
import reporting from "../src/assets/reporting.png";
import logo from "../src/assets/job-finder-logo.svg";

export default function Home({ jobs, getJobListings }) {
  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Stack direction={"row"} bgcolor="#f2dbc7ff">
        <Box display="flex" m={10}>
          <Box>
            <img
              height="100%"
              width="auto"
              src="https://media.istockphoto.com/id/1370901237/photo/shot-of-a-mature-male-architect-standing-with-his-arms-crossed-at-a-building-site.jpg?s=612x612&w=0&k=20&c=pyeQswmuaQhEyXlXHHWlKsCPbq_mWd_zoNZov7i3bgY="
            ></img>
          </Box>

          <Box  height="100%" justifyContent="center" alignItems="center" textAlign="center" gap={2}>
            <Box
              component="img"
              src={logo}
              alt="Job Finder logo"
              sx={{ width: 80, height: 80 }}
            ></Box>
            <Typography variant="h2" fontWeight={500}>
              Job Finder
            </Typography>
            <Typography
              fontSize={18}
              sx={{ whiteSpace: "pre-wrap", px: 20 }}
              fontWeight={500}
            >
              <br />
              {`Welcome to JobFinder! Having trouble keeping yourself organized while on the job hunt? Find documenting your progress on your own to be unintuitive? JobFinder is here to help. We aim to streamline the process of finding jobs you're interested in, and help you track your progress.`}
            </Typography>
            <Typography fontSize={24} fontWeight={600}>
              <br />
              {`Create an account today to make use of our job hunt tools.`}
            </Typography>
            <br />
            <br />
            <Button
              component={Link}
              to="/signin"
              size="large"
              variant="outlined"
              sx={{
                color: "#f49645ff",
                borderColor: "#f49645ff",
                backgroundColor: "#fff8f5ff",
                borderWidth: 6,
                fontSize: "20px",
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Stack>

      <Box>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            border: "4px solid #f49645ff",
            backgroundColor: "#FDFBFB",
            borderLeft: "none",
            borderRight: "none",
            alignItems: "center",
            height: "600px",
            justifyContent: "stretch",
            textAlign: "center",
            p: 10,
          }}
        >
          <Box sx={{ height: "100%", width: "100%" }}>
            <img src={dashboard} height="100%" width="100%"></img>
            <Typography whiteSpace={"pre-wrap"}>
              {`Use our dashboard to organize jobs by your current step in progress!\nYou can manually add jobs that you're interested in applying to.`}
            </Typography>
          </Box>
          <Box sx={{ height: "100%", width: "100%" }}>
            <img src={findJobs} height="100%" width="100%"></img>
            <Typography>
              Find jobs relating to your interests!
              <br />
              Sourced from the Adzuna API.
            </Typography>
          </Box>
          <Box sx={{ height: "100%", width: "100%" }}>
            <img src={reporting} height="100%" width="100%"></img>
            <Typography>
              Our users are able to report fake job postings!
              <br />
              Help our community avoid having their time wasted and information
              taken.
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ mt: 4 }}
      >{`Here's an example of some of the jobs we could help you find!`}</Typography>
      <ExampleJobs exampleJobs={jobs} getJobListings={getJobListings} />
    </Stack>
  );
}
