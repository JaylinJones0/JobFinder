const express = require('express');
const path = require('path');
const { Interest, Skill, ExperienceLevel, User, ReportedUrl } = require('./db/index.js')

const app = express();
const port = 3000;


app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded());


app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
