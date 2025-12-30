import React from "react";
import { Grid, Container, Box, Button } from "@mui/material"


export default function JobList() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 4,
          height: "100%",
          width: "100%",
        }}
      >
        <Grid
          container
          className="job-list"
          sx={{
            maxHeight: 660,
            minWidth: 0,
            minHeight: 0,
            overflow: "auto",
          }}
        ></Grid>
      </Box>
    </Container>
  );
}
