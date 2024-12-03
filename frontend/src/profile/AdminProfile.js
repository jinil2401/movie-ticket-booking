import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAdminById, deleteMovieById } from "../api-helpers/api-helpers";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ email: "", addedMovies: [] });
  const navigate = useNavigate();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    deleteMovieById(id)
      .then(() => {
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          addedMovies: prevAdmin.addedMovies.filter((movie) => movie._id !== id),
        }));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (movie) => {
    navigate(`/edit-movie/${movie._id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#1a202c",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          bgcolor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRight: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 100, color: "#E63946", mb: 2 }} />
          <Typography variant="h6" fontWeight="bold" color="white" mb={1}>
            {admin.email}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "70%",
            padding: 3,
            overflowY: "auto",
          }}
        >
          <Typography variant="h2" fontWeight="bold" color="white" mb={2}>
            Added Movies
          </Typography>
          <AnimatePresence>
            {admin.addedMovies.map((movie) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 90, height: 120, borderRadius: "5px" }}
                    image={movie.posterUrl}
                    alt={movie.title}
                  />
                  <CardContent sx={{ flexGrow: 1, px: 2 }}>
                    <Typography variant="subtitle1" color="white">
                      {movie.title}
                    </Typography>
                  </CardContent>
                  <IconButton
                    onClick={() => handleEdit(movie)}
                    color="primary"
                    sx={{ p: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(movie._id)}
                    color="error"
                    sx={{ p: 1 }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
