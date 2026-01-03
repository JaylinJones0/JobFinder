import React from "react"

//accepts job prop from statusSection
export default function JobListEntry ({job}){
  return (
    <div style={{border: "1px solid #ddd", padding: 5, marginBottom: 5, borderRadius: 4}}>
      {job.title}
      {job.link && (<a href={job.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15 }}>View Job Posting</a>)}
    </div>
  )
}