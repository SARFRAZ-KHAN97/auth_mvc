const express = require('express');


const movieRouter = express.Router();




const { createMovie, getAllMovie, getMovieById, deleteMovie } = require("../controllers/movieController");
const { protectedRouteMiddleware, isAdminMiddleware } = require('../controllers/authController');
const {getCurrentMovies, getTopRatedMovies, getUpcomingMovies} = require("../controllers/discoverController")


movieRouter
    .post("/", createMovie) 
    //.get("/",protectedRouteMiddleware, isAdminMiddleware, getAllMovie)
    //.get("/:id",getMovieById)
    .delete("/:id",deleteMovie)
    .get("/currentPlaying", getCurrentMovies)
    .get("/topRated", getTopRatedMovies)
    .get("/upcoming", getUpcomingMovies)


module.exports = movieRouter;