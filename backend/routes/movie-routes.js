import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie);  // Confirm this line is correct
movieRouter.delete("/:id", deleteMovie);  // Confirm this line is correct

export default movieRouter;
