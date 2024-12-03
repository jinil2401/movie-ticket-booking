import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 350,
        borderRadius: 10,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        ":hover": {
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <img
        src={posterUrl}
        alt={title}
        style={{
          height: "50%",
          width: "99%",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{
            margin: "auto",
            backgroundColor: "rgba(255, 76, 96, 0.8)",
            ":hover": {
              backgroundColor: "rgba(230, 57, 70, 0.9)",
            },
            textTransform: "none",
            fontWeight: "bold",
          }}
          size="small"
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
