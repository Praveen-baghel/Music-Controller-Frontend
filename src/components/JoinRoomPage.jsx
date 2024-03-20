import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage() {
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    roomCode: "",
    roomError: "",
  });

  const handleTextFieldChange = (e) => {
    setRoomData({ ...roomData, roomCode: e.target.value });
  };

  const roomButtonPressed = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_code: roomData.roomCode,
      }),
      credentials: "include",
    };
    fetch("http://localhost:8000/api/room/join/", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomData.roomCode}/`);
        } else {
          setRoomData({ ...roomData, roomError: "Room not found" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={roomData.roomError}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomData.roomCode}
          helperText={roomData.roomError}
          variant="outlined"
          onChange={handleTextFieldChange}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
