import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

export default function Room() {
  let { roomCode } = useParams();
  const [room, setRoom] = useState({
    votesToSkip: "",
    guestCanPause: "",
    isHost: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    fetch("http://localhost:8000/api/room/" + roomCode + "/")
      .then((response) => response.json())
      .then((data) => {
        setRoom({
          votesToSkip: data["data"]["votes_to_skip"],
          guestCanPause: data["data"]["guest_can_pause"],
          isHost: data["data"]["is_host"],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching room details:", error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {room.votesToSkip}
        </Typography>
      </Grid>{" "}
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {room.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {room.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
