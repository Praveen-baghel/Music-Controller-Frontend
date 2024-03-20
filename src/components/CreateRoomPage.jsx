import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Roofing } from "@mui/icons-material";
export default function CreateRoomPage(props) {
  const defaultVotes = 2;
  const navigate = useNavigate();
  const [guestCanPause, setGuestCanPause] = useState(
    props.data ? props.data.guestCanPause : true
  );
  const [votesToSkip, setVotesToSkip] = useState(
    props.data ? props.data.votesToSkip : defaultVotes
  );
  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
      credentials: "include",
    };
    fetch("http://localhost:8000/api/room/", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data["code"]))
      .catch((e) => console.log(e));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <span align="center">Guest Control of Playback State</span>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value={guestCanPause}
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={!guestCanPause}
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required
            type="number"
            defaultValue={votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <span align="center">Votes Required To Skip Song</span>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" component={Link} to="/">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
