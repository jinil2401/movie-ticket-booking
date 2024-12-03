import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isSignup });
  };

  return (
    <div style={{ backgroundColor: "#1a202c", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 400,
          bgcolor: "rgba(255, 255, 255, 0.15)", // Glass effect
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="white">
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {!isAdmin && isSignup && (
          <>
            <FormLabel sx={{ color: "white", mt: 1 }}>Name</FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              name="name"
              variant="filled"
              fullWidth
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                input: { color: "white" },
              }}
            />
          </>
        )}
        <FormLabel sx={{ color: "white", mt: 1 }}>Email</FormLabel>
        <TextField
          value={inputs.email}
          onChange={handleChange}
          name="email"
          type="email"
          variant="filled"
          fullWidth
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            input: { color: "white" },
          }}
        />
        <FormLabel sx={{ color: "white", mt: 1 }}>Password</FormLabel>
        <TextField
          value={inputs.password}
          onChange={handleChange}
          name="password"
          type="password"
          variant="filled"
          fullWidth
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.2)",
            input: { color: "white" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "#2b2d42",
            ":hover": { bgcolor: "#121217" },
            color: "white",
          }}
        >
          {isSignup ? "Signup" : "Login"}
        </Button>
        {!isAdmin && (
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ mt: 2, borderRadius: 10, color: "white" }}
            fullWidth
          >
            Switch to {isSignup ? "Login" : "Signup"}
          </Button>
        )}
      </Box>
    </div>
  );
};

export default AuthForm;
