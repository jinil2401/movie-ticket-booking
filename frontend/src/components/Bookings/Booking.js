import {
  Button,
  FormLabel,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({
    seatNumber: "",
    date: "",
    time: "",
  });
  const [success, setSuccess] = useState(false); // To track success state
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        console.log("Booking Successful:", res);
        setSuccess(true); // Show success message
        setInputs({ seatNumber: "", date: "", time: "" }); // Clear inputs
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false); // Hide success message if an error occurs
      });
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            padding={4}
            minHeight="100vh"
            sx={{ backgroundColor: "#1a202c" }}
          >
            <Typography
              fontFamily="Poppins, sans-serif"
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              color="#fff"
              sx={{ marginBottom: "20px" }}
            >
              Book Tickets for{" "}
              <span style={{ color: "#ff4d4d" }}>{movie.title}</span>
            </Typography>
            {success && (
              <Alert
                severity="success"
                sx={{
                  marginBottom: 2,
                  width: "50%",
                  textAlign: "center",
                  backgroundColor: "#ff4d4d", // Red background
                  color: "white", // White text
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0px 4px 20px rgba(255, 77, 77, 0.6)",
                }}
              >
                Booking Successful! Check your email for confirmation.
              </Alert>
            )}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="80%"
              gap={4}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.37)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#fff",
                padding: "20px",
              }}
            >
              {/* Movie Image */}
              <Box
                width="40%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                  }}
                />
              </Box>

              {/* Booking Form */}
              <Box width="60%" padding={3}>
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection="column" gap={4}>
                    <FormLabel>Select Date</FormLabel>
                    <TextField
                      name="date"
                      type="date"
                      value={inputs.date}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        style: { color: "#fff" },
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "rgba(0,0,0,0.2)",
                          color: "#fff",
                        },
                      }}
                    />
                    <FormLabel>Select Time</FormLabel>
                    <Select
                      name="time"
                      value={inputs.time}
                      onChange={handleChange}
                      displayEmpty
                      fullWidth
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.2)",
                        color: "#fff",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Choose a Time
                      </MenuItem>
                      <MenuItem value="2:30 pm">2:30 pm</MenuItem>
                      <MenuItem value="6:00 pm">6:00 pm</MenuItem>
                      <MenuItem value="9:00 pm">9:00 pm</MenuItem>
                    </Select>
                    <FormLabel>Seat Number</FormLabel>
                    <TextField
                      name="seatNumber"
                      value={inputs.seatNumber}
                      onChange={handleChange}
                      placeholder="Enter Seat Number"
                      variant="outlined"
                      InputProps={{
                        style: { color: "#fff" },
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          backgroundColor: "rgba(0,0,0,0.2)",
                          color: "#fff",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      sx={{
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        padding: "10px 0",
                        borderRadius: "10px",
                        fontSize: "1.2rem",
                        ":hover": {
                          backgroundColor: "#d64545",
                        },
                      }}
                    >
                      Confirm Booking
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
