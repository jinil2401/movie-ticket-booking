import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, updateMovie } from '../../api-helpers/api-helpers';  // Adjusted import path
import { TextField, Button, Box, Typography, FormLabel, Checkbox } from '@mui/material';  // Added necessary imports

const EditMovieDetails = () => {
  const { id } = useParams(); // Extract movie ID from the URL
  const navigate = useNavigate(); // For redirecting after update
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    releaseDate: '',
    posterUrl: '',
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState('');
  const [error, setError] = useState(null); // To track errors

  // Fetch movie details on component mount
  useEffect(() => {
    console.log('Fetching movie details for ID:', id); // Debugging log
    getMovieDetails(id)
      .then((data) => {
        console.log('Movie details fetched:', data); // Log the response
        if (data && data.movie) {
          setMovie({
            title: data.movie.title,
            description: data.movie.description,
            releaseDate: data.movie.releaseDate.split('T')[0], // Extract date part
            posterUrl: data.movie.posterUrl,
          });
          setActors(data.movie.actors || []); // Set existing actors
        } else {
          setError('Failed to fetch movie details.');
        }
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setError('An error occurred while fetching movie details.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting updated movie details:', movie); // Debugging log
    updateMovie(id, { ...movie, actors })
      .then((res) => {
        console.log('Movie updated successfully:', res); // Log the success
        navigate('/admin-profile'); // Redirect to AdminProfile after success
      })
      .catch((err) => {
        console.error('Error updating movie:', err);
        setError('Failed to update movie details.');
      });
  };

  return (
    <div style={{ backgroundColor: "#1a202c", minHeight: "100vh" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          maxWidth: 762,
          margin: 'auto',
          mt: 0,
          padding: 3,
          bgcolor: 'rgba(255, 255, 255, 0.24)', // Updated for subtle background effect
          backdropFilter: 'blur(10px)', // Glass effect
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          color: 'white', // Ensuring readability on light backdrop
        }}
      >
        <Typography textAlign={"center"} variant="h2" fontFamily={"verdana"} color={"white"} fontWeight="bold">
          Edit Movie Details
        </Typography>
        {error && (
          <Typography variant="body1" color="error" mb={2}>
            {error}
          </Typography>
        )}
        <FormLabel sx={{ color: 'white', mt: 1 }}>Title</FormLabel>
        <TextField
          fullWidth
          label="Movie Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          variant="filled"
          margin="normal"
          sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
        />
        <FormLabel sx={{ color: 'white', mt: 1 }}>Description</FormLabel>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          variant="filled"
          margin="normal"
          multiline
          rows={4}
          sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
        />
        <FormLabel sx={{ color: 'white', mt: 1 }}>Release Date</FormLabel>
        <TextField
          fullWidth
          label="Release Date"
          name="releaseDate"
          type="date"
          value={movie.releaseDate}
          onChange={handleChange}
          variant="filled"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
        />
        <FormLabel sx={{ color: 'white', mt: 1 }}>Poster URL</FormLabel>
        <TextField
          fullWidth
          label="Poster URL"
          name="posterUrl"
          value={movie.posterUrl}
          onChange={handleChange}
          variant="filled"
          margin="normal"
          sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
        />
        <FormLabel sx={{ color: 'white', mt: 1 }}>Actor</FormLabel>
        <Box display={"flex"}>
          <TextField
            fullWidth
            label="Actor"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            variant="filled"
            sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
          />
          <Button
            onClick={() => {
              setActors([...actors, actor]);
              setActor(""); // Reset actor input field
            }}
            variant="contained"
            sx={{
              bgcolor: "#2b2d42",
              ":hover": { bgcolor: "#121217" },
              ml: 2,
              height: "80%" 
            }}
          >
            Add Actor
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {actors.map((actor, index) => (
            <Typography key={index} sx={{ color: 'white', mr: 1, mb: 1 }}>
              {actor}
            </Typography>
          ))}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '30%', margin: 'auto', mt: 2, bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217" } }}
        >
          Update Movie
        </Button>
      </Box>
    </div>
  );
};

export default EditMovieDetails;
