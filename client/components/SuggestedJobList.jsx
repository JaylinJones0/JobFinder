import React from "react";

import SuggestedListEntry from "./SuggestedListEntry.jsx";

export default function SuggestedJobList({ jobs }) {
  return (
    <div>
        {
            jobs.map(job => {
                return <SuggestedListEntry name={job.title} link={job.redirect_url} description={job.description} key={job.id} />
            })
        }
    </div>
  );
}
