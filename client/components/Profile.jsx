import React from "react";
import { useEffect, useState, useEffectEvent } from "react";
import {
  Button,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  Chip,
  Select,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Paper,
  Input,
  TextField,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

export default function Profile({ userInfo }) {
  const [storedPrefs, setStoredPrefs] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]);

  // on intitial render/on change of stored preferences,
  // trigger rerender and update storedPrefs state
  useEffect(() => {
    if (userInfo && userInfo.preferences.length !== 0) {
      setSelectedPrefs(userInfo.preferences);
    }
    getPrefs();
  }, [userInfo]);

  const getPrefs = () => {
    axios
      .get("/api/preferences")
      .then((response) => {
        const prefsArr = response.data;
        setStoredPrefs(prefsArr);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // an Event for getJobListings to prevent stale closures
  const getDefaultJobListingsEvent = useEffectEvent(() => {
    getJobListings();
    return; // do nothing, end function (page would initally load very slow without return)
  });

  // an Event for getJobListings (with arguments provided)
  const getJobListingsEvent = useEffectEvent(() => {
    // loop won't run until preferences are provided
    for (const pref of selectedPrefs) {
      getJobListings(pref, prefsArray);
    }
    return; // do nothing, end function (page would initally load very slow without return)
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPrefs(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClick = () => {
    console.log(userInfo);
    axios
      .patch(`/api/update-preferences/${userInfo._id}`, {
        preferences: selectedPrefs,
      })
      .then((response) => {
        const successMsg = response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // before render check if user is signed in,
  if (!userInfo) {
    return <div>You should not be here buddy</div>;
  }

  return (
    <Container
      sx={{
        height: "92vh",
      }}
    >
      <Box
        sx={{
          pt: 4,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Paper elevation={4}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <CardContent>
              <Typography variant="h2">
                Signed In As: {userInfo.displayName}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Box>
      <Box
        sx={{
          pt: 4,
          height: "80%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Paper elevation={6}>
          <Card sx={{ width: "100%", height: "100%" }}>
            <CardContent>
              <Typography variant="h2" sx={{ mt: 4}}>Choose your Preferences!</Typography>
            </CardContent>
            <FormControl sx={{ m: 1, width: 300, mt: 4}}>
              <InputLabel>Preferences</InputLabel>
              <Select
                labelId="preferences-multiple-chip-label"
                id="preferences-multiple-chip"
                multiple
                value={selectedPrefs}
                onChange={handleChange}
                input={<OutlinedInput label="Preferences" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((prefValue, i) => (
                      <Chip
                        key={i}
                        label={prefValue
                          .replace(/-/g, " ")
                          .replace(/jobs/g, "")
                          .toUpperCase()}
                      />
                    ))}
                  </Box>
                )}
              >
                {storedPrefs.map((pref, i) => (
                  <MenuItem key={i} value={pref}>
                    {pref.replace(/-/g, " ").replace(/jobs/g, "").toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="inherit"
                size="large"
                sx={{ mt: 1 }}
                onClick={handleClick}
              >
                Apply Changes
              </Button>
            </FormControl>
            <CardContent>
              <Typography variant="h6" sx={{ mt: 10 }}>
                Can&apos;t find a preference that fits?
                <br />
                Suggest one here:
              </Typography>
            </CardContent>
            <FormControl sx={{}}>
              <InputLabel>Enter Suggestion</InputLabel>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <TextField ></TextField>
                <Button
                  variant="contained"
                  color="inherit"
                  size="large"
                  sx={{height: "50px"}}
                >
                  Send
                </Button>
              </Box>
              <FormHelperText sx={{ mb: 8}}>
                Suggestion review may take up to 7 business days.
              </FormHelperText>
            </FormControl>
          </Card>
        </Paper>
      </Box>
    </Container>
  );
}
