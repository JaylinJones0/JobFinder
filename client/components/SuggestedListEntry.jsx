import React from "react";

export default function SuggestedListEntry({ name, link, description }) {
  return (
    <div>
        <p>Job Title: {name} </p>
        <a href='url'>{link}</a>
        <p>Description: {description}</p>
    </div>
  );
}
