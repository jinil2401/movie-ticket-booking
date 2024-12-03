import { Box, Typography, Chip, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      margin="auto"
      padding={4}
      minHeight="100vh"
      sx={{
        backgroundColor: "#1a202c",
      }}
    >
      <Typography
        variant="h4"
        color="#FF4C60"
        textAlign="center"
        fontFamily="Poppins, sans-serif"
        fontWeight="bold"
        sx={{ marginBottom: "30px" }}
      >
        Browse All Movies
      </Typography>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
      >
        {movies &&
          movies.map((movie) => (
            <Box
              key={movie._id}
              sx={{
                width: "300px",
                padding: "16px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
              }}
            >
              {/* Movie Poster */}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
              {/* Movie Title */}
              <Typography
                variant="h6"
                color="#fff"
                marginTop={2}
                fontWeight="bold"
              >
                {movie.title}
              </Typography>
              {/* Movie Release Date */}
              <Typography color="gray">
                {new Date(movie.releaseDate).toDateString()}
              </Typography>
              {/* Display Static Showtimes */}
              <Typography
                variant="subtitle1"
                color="#FF4C60"
                fontWeight="bold"
                marginTop={2}
              >
                Showtimes:
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                gap={1}
                marginTop={1}
                flexWrap="wrap"
              >
                {["2:30 pm", "6:00 pm", "9:00 pm"].map((time, index) => (
                  <Chip
                    key={index}
                    label={time}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Box>
              {/* Book Now Button */}
              <Button
                variant="contained"
                fullWidth
                LinkComponent={Link}
                to={`/booking/${movie._id}`}
                sx={{
                  marginTop: "16px",
                  bgcolor: "#E63946",
                  ":hover": {
                    bgcolor: "#D62828",
                  },
                }}
              >
                Book Now
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
