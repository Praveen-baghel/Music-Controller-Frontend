import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
export default function Room() {
  const navigate = useNavigate();
  let { roomCode } = useParams();
  const [room, setRoom] = useState({
    votesToSkip: "",
    guestCanPause: "",
    isHost: "",
  });
  const [showSettings, setshowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch(
      "http://localhost:8000/api/room/?room_code=" + roomCode,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data["is_found"] == true) {
          setRoom({
            votesToSkip: data["votes_to_skip"],
            guestCanPause: data["guest_can_pause"],
            isHost: data["is_host"],
          });
          setIsLoading(false);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching room details:", error);
      });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch("http://localhost:8000/api/room/leave/", requestOptions)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            data={{
              roomCode: roomCode,
              update: true,
              guestCanPause: room.guestCanPause,
              votesToSkip: room.votesToSkip,
              updateCallback: () => {}, // Suggestion to provide a real callback function
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setshowSettings(false)} // Changed to false to close settings
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };
  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setshowSettings(true);
          }}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  if (showSettings) {
    return renderSettings();
  }

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
      {room.isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}
