import React from "react";
import { useState, useEffect, useEffectEvent } from "react";
import SuggestedListEntry from "./SuggestedListEntry.jsx";

export default function SuggestedJobList({ jobs, getJobListings }) {
  const [selectedPrefs, setSelectedPrefs] = useState(new Set());
  
  console.log(selectedPrefs)

  const getDefaultJobListingsEvent = useEffectEvent(() => {
    getJobListings();
    return; // do nothing, end function (page would initally load very slow without return)
  });

  const getJobListingsEvent = useEffectEvent(() => {
    // loop won't run until preferences are provided
    for (const pref of selectedPrefs) {
      let prefsArray = Array.from(selectedPrefs);
      getJobListings(pref, prefsArray);
    }
    return; // do nothing, end function (page would initally load very slow without return)
  });

  // function that runs on initial render
  // also runs every time selectedPrefs is updated
  useEffect(() => {
    if (selectedPrefs.size === 0) {
      getDefaultJobListingsEvent();
    }
    // if selectedPrefs isn't empty
    getJobListingsEvent();
  }, [selectedPrefs]);

  return (
    <div>
      <h1>Choose your job preferences</h1>
      <div className="job-category-buttons">
        <div>
          <button
            name="it-jobs"
            onClick={(e) => {
              const category = e.target.name;
              setSelectedPrefs(new Set([...selectedPrefs, category]));
            }}
          >
            IT
          </button>
        </div>
        <div>
          <button
            name="engineering-jobs"
            onClick={(e) => {
              const category = e.target.name;
              setSelectedPrefs(new Set([...selectedPrefs, category]));
            }}
          >
            Engineering
          </button>
        </div>
      </div>
      <div className="list-entry">
        {jobs.map((job) => {
          return (
            <SuggestedListEntry
              name={job.title}
              link={job.redirect_url}
              description={job.description}
              key={job.id}
            />
          );
        })}
      </div>
    </div>
  );
}
