import { Box, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserBooking, getUserDetails, deleteBooking } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { motion, AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#1a202c",
        padding: 4
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          maxHeight: "90vh",
          bgcolor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          overflow: "auto"
        }}
      >
        {/* User Details Section */}
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            borderRight: "2px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 100, color: "#E63946", mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" color="white" mb={1}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="gray" mb={1}>
            Email: {user.email}
          </Typography>
          
        </Box>

        {/* Booking History Section */}
        <Box
          sx={{
            width: "70%",
            padding: 3,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="white" mb={2}>
            Booking History
          </Typography>
          <AnimatePresence>
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{
                  display: 'flex',
                  mb: 1,
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
                }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, objectFit: 'cover' }}
                    image={booking.movie.posterUrl}
                    alt={booking.movie.title}
                  />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="subtitle1" color="white">
                      {booking.movie.title}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      Seat: {booking.seatNumber}
                    </Typography>
                  </CardContent>
                  <IconButton onClick={() => handleDelete(booking._id)} color="error">
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

export default UserProfile;
