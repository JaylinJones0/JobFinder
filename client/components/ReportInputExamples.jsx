import React from "react";
import { useState } from "react";
import axios from "axios";


/*
 * This file serves as an example of how to implement Reporting. It was made before the rest of the front-end was ready, but might be useful for integrating Reporting in other placed.
 */

// How these things should work...

/* 
INPUT:
allows you to put in a link
once you click off, it checks if the link provided has been reported before.
if it has, grab the data, and see how many times its been reported, i.e, the length of userIDs.
if it's 3 or greater, display a warning, along with the number of users who have reported the link
they can still input it but it lets them know.
*/

/* BUTTON
reports the link of the "current job", since this is just an example it uses "example.com" for every report.
FIRST, it checks if the current userID is on this link...
If it's not...
did it actually find the link when it checked for it?
If so...
adds the current userID to the usersReported of the link.
give some feedback to the user that their report has been stored.
If not...
posts the link along with the current userID
gives some feedback to the user that their report has been stored.
If the user HAS already reported the link...
give feedback to the user, telling them they have already reported this link, and that the additional report was not sent.
ideas: error message like the success feedback.
button is grayed out and unclickable, but this means that it has to check for the link every time by default.
*/

/**
 * @name ReportInputExamples
 * ReportInputExamples is a React Component builder that makes an example of reporting, how you're warned of reports up when you input a website, and the feedback it gives you when you press report as a job.
 * The report button ALWAYS points to "example.com".
 * It only shows reports on 
 * @returns ReportInputExamples Component.
 */
export default function ReportInputExamples() {

  /**
   * @name reportCount
   * A state variable that changes based on the number of reports it read on example.com's usersReported array.
   * @type {number}
  */
  const [reportCount, setReportCount] = useState(0); // On actual report detection, this shouldn't just be based on example.com, obviously.

  /**
   * @name reportWarning
   * A state variable that decides whether the warning that people have reported the input-ed link should show up. It requires that at least 3 people have reported the link for it to show up.
   * @type {boolean}
  */
  const [reportWarning, setReportWarning] = useState(false);

  /**
   * @name warnMessage
   * A state variable that decides whether or not to tell the user that they already reported the link.
   * @type {boolean}
  */
  const [warnMessage, setWarnMessage] = useState(false);

  /**
   * @name successMessage
   * A state variable that decides whether or not to tell the user that the report went through successfully.
   * @type {boolean}
  */
  const [successMessage, setSuccessMessage] = useState(false);

  /**
   * @name getReportedLink
   * getReportedLink gets the link at the provided URL, and sees if it's in the reported-links table of the database.
   * @param url 
   * @type {string}
   * @returns Returns an axios-get request, its errors are already catch-ed. You can .then off of it to do more with this function.
  */
  const getReportedLink = (url) => {
    return axios
      .get("/api/reported-links", url ? { params: { link: url } } : {})
      .catch((err) => {
        console.error(
          `Something went wrong while GETting a report. Url passed in: ${url}`,
          err
        );
      });
  };

  /**
   * @name postReport
   * postReport posts the report to the database if the current user is the first one to ever report it.
   * @param url 
   * @type {string}
   * @param userID (In the future, this should use the currently logged in user, rather than passing in a hard-coded one.)
   * @type {string}
   * @returns Returns an axios-post request, its errors are already catch-ed. You can .then off of it to do more with this function.
  */
  const postReport = (url, userID) => {
    return axios
      .post("/api/reported-links", {
        report: {
          url,
          usersReported: [userID],
        },
      })
      .catch((err) => {
        console.error("Something went wrong while making a new report: ", err);
      });
  };

  /**
   * @name patchReport
   * patchReport adds the passed in userID to the report, if it wasn't there already.
   * @param url 
   * @type {string}
   * @param userID (In the future, this should use the currently logged in user, rather than passing in a hard-coded one.)
   * @type {string}
   * @returns Returns an axios-patch request, its errors are already catch-ed. You can .then off of it to do more with this function.
  */
  const patchReport = (url, userID) => {
    return axios
      .patch("/api/reported-links", {
        user: userID,
        link: url,
      })
      .catch((err) => {
        console.error(
          "Something went wrong while adding the user to the report: ",
          err
        );
      });
  };

  /**
   * @name handleClickOffInput
   * This function is to be run when the user clicks off an input element. This specific handler sets reportWarning to true if more than 3 users have reported the link provided.
   * @param inputValue - the current 'value' of the input element.
   * @type {string}
   * @returns Nothing.
  */
  const handleClickOffInput = (inputValue) => {
    getReportedLink(inputValue).then((reportObj) => {
      if(reportObj) {
        if (reportObj.data.usersReported.length >= 3) {
          setReportCount(reportObj.data.usersReported.length);
          setReportWarning(true);
        }
      }
    });
  };

    /**
   * @name handleReportSubmission
   * This function checks if the link has ever been reported. If it hasn't, it posts the users request, and if it has, it patches your user into the request.
   * The function updates successMessage or warnMessage based on the output. 
   * If the user has already reported this link, warnMessage is true. 
   * If they haven't and the request worked, it sets successMessage to true.
   * @param reportedUrl - the url that is being reported.
   * @type {string}
   * @returns Nothing.
  */
  const handleReportSubmission = (reportedUrl) => {

    // first, it checks if the link has ever been reported...
    getReportedLink(reportedUrl).then((reportObj) => {
      if (reportObj) {
        // if it has...
        if (reportObj.data.usersReported.includes("fakeID-Client")) {
          // has the user already reported it?
          // if so, display a message saying that they have already reported this link.
          setWarnMessage(true);
        } else {
          // if not...
          // make a PATCH request, and send the current userID and related link.
          patchReport("example.com", "fakeID-Client").then(() => {
            // (for this example, the link will always be example.com, but really it would be attatched to the job that the report button is attatched to.)
            // once the request is complete, display the success message.
            setSuccessMessage(true);
          });
        }
      } else {
        // if it has not...
        postReport("example.com", "fakeID-Client").then(() => {
          // make a POST request to post the new report.
          // once the post request has gone through, display the success message.
          setSuccessMessage(true);
        });
      }
    });
  };

  return (
    // the warnings aren't nessecerily exactly as I imagine them to look, but they get across the idea of notifying the user that we have their input.

    <div>
      <div id="jobInputReportingExample">
        <p>Example of a job-input. Will give a warning if you have 3 userIDs stored in the report associated with the inputed link.</p>
        <input
          type="text"
          placeholder="Your jobs link, or location..."
          onBlur={(event) => {
            handleClickOffInput(event.target.value);
          }}
        />
        {reportWarning ? (
          <p id="report-warning-info">
            Are you sure you want to add this job? {reportCount} users have reported this job listing as fraudulent.
          </p>
        ) : (
          <></>
        )}
      </div>
      <div id="ReportButtonExample">
        <p>{'Example of a report button, which would be attatched to a jobListEntry. For the example, the userID is always "fakeID-Client". It always sends a report for "example.com".'}</p>
        <button
          onClick={(event) => {
            handleReportSubmission("example.com");
          }}
        >
          Report Job
        </button>
        {warnMessage ? (
          <p id="report-warning-alreadysent">
            You have already reported this link. Another report was not sent.
          </p>
        ) : (
          <></>
        )}
        {successMessage ? (
          <p id="report-confirm">
            Thanks you for you input! We have saved your report.
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}