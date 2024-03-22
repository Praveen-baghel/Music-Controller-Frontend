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
  Collapse,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Roofing } from "@mui/icons-material";
export default function CreateRoomPage(props) {
  const title = props.data.update ? "Update Room" : "Create a Room";
  const defaultVotes = 2;
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    guestCanPause: props.data ? props.data.guestCanPause : true,
    votesToSkip: props.data ? props.data.votesToSkip : defaultVotes,
    successMsg: "",
    errorMsg: "",
  });
  const handleVotesChange = (e) => {
    setRoom({ ...room, votesToSkip: e.target.value });
  };

  const handleGuestCanPauseChange = (e) => {
    setRoom({ ...room, guestCanPause: e.target.value === "true" });
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: room.votesToSkip,
        guest_can_pause: room.guestCanPause,
      }),
      credentials: "include",
    };
    fetch("http://localhost:8000/api/room/", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data["code"]))
      .catch((e) => console.log(e));
  };
  const handleUpdateButtonPressed = () => {
    console.log(props.data);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: room.votesToSkip,
        guest_can_pause: room.guestCanPause,
        code: props.data.roomCode,
      }),
      credentials: "include",
    };
    fetch("http://localhost:8000/api/room/", requestOptions)
      .then((response) => {
        if (response.ok) {
          setRoom({ ...room, successMsg: "Room updated successfully" });
        } else [setRoom({ ...room, errorMsg: "Error updating room..." })];
      })
      .catch((e) => console.log(e));
  };
  const renderCreateRoomButons = () => {
    return (
      <>
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
      </>
    );
  };
  const renderUpdateRoomButons = () => {
    return (
      <>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={room.errorMsg != "" || room.successMsg != ""}>
          {room.successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setRoom({ ...room, successMsg: "" });
              }}
            >
              {room.successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setRoom({ ...room, errorMsg: "" });
              }}
            >
              {room.errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <span align="center">Guest Control of Playback State</span>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={room.guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
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
            defaultValue={room.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <span align="center">Votes Required To Skip Song</span>
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.data.update ? renderUpdateRoomButons() : renderCreateRoomButons()}
    </Grid>
  );
}
