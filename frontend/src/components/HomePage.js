import { Box, Typography, Button, Card, CardMedia, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1e1e1e, #141414)",
        color: "white",
        padding: { xs: "0.5rem", sm: "0.5rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box", // Ensure no overflow from padding or borders
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: { xs: "50vh", sm: "60vh", md: "70vh", lg: "80vh" },
          backgroundImage: "url('/path-to-your-hero-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          marginBottom: "2rem",
          width: "100%", // Ensure it takes full width
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#FF4C60",
            textShadow: "2px 2px 15px rgba(0, 0, 0, 0.7)",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5rem" },
          }}
        >
          Welcome to FlickShow
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1rem",
            color: "#FFFFFF",
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem", lg: "2rem" },
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          Explore the latest movies, showtimes, and more!
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: "1.5rem",
            padding: "0.8rem 2rem",
            backgroundColor: "#FF4C60",
            color: "#FFFFFF",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#FF6E7A",
              transform: "scale(1.05)",
              transition: "0.3s ease",
            },
          }}
          onClick={() => navigate("/movies")}
        >
          Browse Movies
        </Button>
      </Box>

      {/* Featured Movies Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "1rem",
          width: "100%", // Ensure it takes full width
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#FF4C60",
            marginBottom: "30px",
          }}
        >
          Featured Movies
        </Typography>

        {/* Grid Layout for Featured Movies */}
        <Grid container spacing={4} justifyContent="center">
          {movies.slice(0, 6).map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  height: "400px", // Fixed card height to keep them uniform
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                  },
                }}
                onClick={() => navigate(`/booking/${movie._id}`)}
              >
                <CardMedia
                  component="img"
                  height="250" // Adjusted to fit within the fixed card size
                  image={movie.posterUrl || "/default-movie-poster.jpg"}
                  alt={movie.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ padding: "0.5rem" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#FF4C60",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "0.5rem",
                      color: "#CCCCCC",
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    {movie.description.slice(0, 80)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1.5rem 1rem",
          backgroundColor: "#141414",
          borderRadius: "8px",
          width: "100%", // Ensure full width
          maxWidth: "1200px", // Optional, for better max-width control
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#FF4C60",
            marginBottom: "1rem",
            fontSize: { xs: "1.1rem", sm: "1.6rem" },
          }}
        >
          Ready to Book Your Next Movie Night?
        </Typography>
        <Button
          variant="contained"
          sx={{
            padding: "0.7rem 1.8rem",
            backgroundColor: "#FF4C60",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#FF6E7A",
              transform: "scale(1.05)",
              transition: "0.3s ease",
            },
          }}
          onClick={() => navigate("/movies")}
        >
          Explore Showtimes
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
