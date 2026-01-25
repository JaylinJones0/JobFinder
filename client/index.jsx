// Supports weights 100-900
import '@fontsource-variable/jost';
import "./src/styles.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router";
import App from "./components/App.jsx";

  const theme = createTheme({
  palette: {
    text: {
      primary: '#732400',
    },
  },
  typography: {
    fontFamily: '"Jost Variable", sans-serif'
  }
});


const root = createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
  </BrowserRouter>
);
