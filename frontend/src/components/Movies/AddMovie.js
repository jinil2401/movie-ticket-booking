import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
        <Box
          width={"100%"}
          padding={2}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          minHeight={'100vh'}
          bgcolor={'#1a202c'}
          boxShadow={"10px 10px 20px #ccc"}
        >
        <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.2)', // Light glass effect
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
            padding: 4,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: 'white' // Ensuring readability on light backdrop
          }}
        >
          <Typography textAlign={"center"} variant="h2" fontFamily={"verdana"} color={"white"} fontWeight="bold">
            Add New Movie
          </Typography>
          <FormLabel sx={{ color: 'white', mt: 1 }}>Title</FormLabel>
          <TextField
             label="Title"
             name="title"
             value={inputs.title}
             onChange={handleChange}
             variant="filled"
             fullWidth
             margin="normal"
             sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
          />
          <FormLabel sx={{ color: 'white', mt: 1 }}>Description</FormLabel>
          <TextField
           label="Description"
           name="description"
           value={inputs.description}
           onChange={handleChange}
           variant="filled"
           fullWidth
           multiline
           rows={4}
           margin="normal"
           sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
          />
          <FormLabel sx={{ color: 'white', mt: 1 }}>Poster URL</FormLabel>
          <TextField
           label="Poster URL"
           name="posterUrl"
           value={inputs.posterUrl}
           onChange={handleChange}
           variant="filled"
           fullWidth
           margin="normal"
           sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
          />
          <FormLabel sx={{ color: 'white', mt: 1 }}>Release Date</FormLabel>
          <TextField
           type="date"
           label="Release Date"
           name="releaseDate"
           value={inputs.releaseDate}
           onChange={handleChange}
           variant="filled"
           fullWidth
           margin="normal"
           sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
           InputLabelProps={{ shrink: true }}
          />
          <FormLabel sx={{ color: 'white', mt: 1 }}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              label="Actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              variant="filled"
              fullWidth
              sx={{ background: 'rgba(255, 255, 255, 0.3)' }}
            />
             <Button onClick={() => {
              setActors([...actors, actor]);
              setActor("");
            }} variant="contained" sx={{ bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217" } }}>
              Add
            </Button>
          </Box>
          <FormLabel sx={{ color: 'white', mt: 1 }}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '30%', margin: 'auto', mt: 2, bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217" } }}
          >
            Add New Movie
          </Button>
        </Box>
        </form>
        </Box>
    </div>
  );
};

export default AddMovie;

