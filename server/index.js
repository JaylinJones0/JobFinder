const express = require("express");
const axios = require("axios");
/* Since we're most likely unfamiliar since we haven't used
 helmet in class here's a brief reason for installing helmet:

 - It's stated to be best practice as is directly referenced in
 Express's 'Production Best Practices: Security' section which I will reference here: 
 https://expressjs.com/en/advanced/best-practice-security.html#production-best-practices-security

 - I (Jaylin) came across helmet when running into a Content Security Policy error in the 
 browser when attempting to click the rendered hyperlinks that link directly to the job posting.
 For this singular issue helmet is not required, *however* we may run into issues down the line
 that helmet can solve in terms of security for our application, and general errors that may show
 themselves in the browser's console if there's a HTTP header that we forgot to set/configure.

 ONLY CONCERN WITH HELMET:
 - MAY or may not need to disable header if it clashes with our needs. 
 For most cases helmet should be a set it and forget it solution. Luckily 
 disabiling or custom configuration of headers is possible with helmet.
*/
const helmet = require("helmet");

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
app.use(helmet());
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
  // only want 6 job results for now (will probably change)
  const results_per_page = 6;
  // if category parameter is not defined send client default job listings
  if (!category) {
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
