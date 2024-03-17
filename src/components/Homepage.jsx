import React, { useEffect, useState } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);
  useEffect(() => {
    async function fetchRoomCode() {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
        const response = await fetch(
          "http://localhost:8000/api/user/in-room/",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to fetch room code");
        }
        const data = await response.json();
        console.log(data);
        setRoomCode(data.code);
      } catch (error) {
        console.error("Error fetching room code:", error);
      }
    }

    fetchRoomCode();
  }, []);
  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Salazar's Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };
  return roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage();
}
