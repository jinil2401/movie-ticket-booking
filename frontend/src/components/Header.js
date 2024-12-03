import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";  // Added Login Icon
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; // Added Admin Panel Icon
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "rgba(20, 20, 20, 0.9)",
        color: "white",
        padding: "0.5rem 2rem",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            cursor: "pointer",
            "&:hover": { transform: "scale(1.1)", transition: "0.3s ease" },
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              fontWeight: "bold",
              letterSpacing: 1.5,
              color: "#FF4C60",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            FlickShow
          </Typography>
        </Box>

        {/* Search Section */}
        <Box width={"30%"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Movies..."
                sx={{
                  input: { color: "white" },
                  "& .MuiInput-underline:before": { borderBottomColor: "#FF4C60" },
                  "& .MuiInput-underline:hover:before": { borderBottomColor: "#FF4C60" },
                  "& .MuiInput-underline:after": { borderBottomColor: "#FF4C60" },
                }}
                variant="standard"
              />
            )}
          />
        </Box>

        {/* Navigation Tabs */}
        <Tabs
          textColor="inherit"
          indicatorColor="secondary"
          value={value}
          onChange={(e, val) => setValue(val)}
          sx={{
            "& .MuiTab-root": {
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              transition: "0.3s ease",
              "&:hover": { color: "#FF4C60" },
            },
            "& .Mui-selected": {
              color: "#FF4C60 !important",
            },
          }}
        >
          <Tab label="Home" LinkComponent={Link} to="/" />
          <Tab label="Showtimes" LinkComponent={Link} to="/movies" />
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Tab label="" LinkComponent={Link} to="/auth" icon={<LoginIcon />} /> {/* Added Login Icon */}
              {/* Admin Icon to switch to Admin Login */}
              <Box sx={{ marginTop: 1 }}>
                <IconButton
                  onClick={() => navigate("/admin")}
                  sx={{
                    color: "#FF4C60",
                    fontSize: "1.3rem",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  <AdminPanelSettingsIcon /> {/* Admin Panel Icon */}
                </IconButton>
              </Box>
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Tab
                icon={<AccountCircleIcon sx={{ fontSize: "1.5rem" }} />}
                iconPosition="start"
                onClick={() => navigate("/user")}
                sx={{ fontSize: "1rem" }}
              />
              <Tab
                icon={<ExitToAppIcon sx={{ fontSize: "1.5rem" }} />}
                iconPosition="start"
                onClick={() => logout(false)}
                sx={{ fontSize: "1rem" }}
              />
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <Tab label="Add Movie" LinkComponent={Link} to="/add" />
              <Tab label="Profile" LinkComponent={Link} to="/user-admin" />
              <Tab
                icon={<ExitToAppIcon sx={{ fontSize: "1.5rem" }} />}
                iconPosition="start"
                onClick={() => logout(true)}
                sx={{ fontSize: "1rem" }}
              />
            </>
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
