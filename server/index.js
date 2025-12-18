const express = require("express");
const axios = require("axios");

const dotenv = require("dotenv/config");
const { app_id, app_key } = process.env;

const path = require("path");
const {
  Interest,
  Skill,
  ExperienceLevel,
  User,
  ReportedUrl,
} = require("./db/index.js");

//init app
const app = express();
const port = 3000;

//MIDDLEWARE:
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded());

//ROUTES:

//Base route, link for user to click to sign in w/ google
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate w/ Google</a>');
});

//Protected route (User can't visit this route unless logged in w/ google)
//When a user is logged in we will have access to their details
app.get("/protected", (req, res) => {
  res.send("Hello");
});

// route to allow client to make GET request using /findjobs/:category endpoint
// will send back default job list for now
app.get("/findjobs{/:category}", (req, res) => {
  const { category } = req.params;
  // only want 8 job results for now (will probably change)
  const results_per_page = 8;
  // if category parameter is not defined send client default job listings
  if (!category) {
    console.log(app_key);
    axios
      .get("http://api.adzuna.com/v1/api/jobs/us/search/1", {
        params: {
          app_id,
          app_key,
          results_per_page,
        },
      })
      .then((jobs) => {
        const jobsArray = jobs.data.results;
        res.status(200).send(jobsArray);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error("Failed to GET jobs", err);
      });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
