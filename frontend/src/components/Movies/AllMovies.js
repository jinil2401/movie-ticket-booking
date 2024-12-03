import { Typography, Button, Box, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../helpers/api-helpers";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies)) // Assuming API returns movies array
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={4} padding={2}>
      <Typography variant="h4" textAlign="center" padding={2}>
        Now Playing
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={4}
        margin="auto"
      >
        {movies &&
          movies.map((movie) => (
            <Box
              key={movie._id}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(5px)",
                borderRadius: "10px",
                padding: "16px",
                width: "300px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Typography variant="h6" color="white" marginTop={2}>
                {movie.title}
              </Typography>
              <Typography color="gray">
                {new Date(movie.releaseDate).toDateString()}
              </Typography>
              <Box display="flex" justifyContent="center" gap={1} marginTop={2}>
                {movie.timings?.map((time, index) => (
                  <Chip
                    key={index}
                    label={time}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Box>
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
                See Details
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default AllMovies;
