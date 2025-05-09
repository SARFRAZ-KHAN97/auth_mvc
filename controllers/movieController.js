const movieModel = require("./../Models/movieModel");

const createMovie = async function (req, res) {
    try {
        const movieObject = req.body;

        const movie = await movieModel.create(movieObject);
        res.status(200).json(movie);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}


const getAllMovie = async (req, res) => {
    try {
        const movie = await movieModel.find();
        if(movie.length!=0) {
            res.status(200).json({
                message: movie
        })
        }
        else {
            res.status(404).json({
                message: "No user present"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
}


const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await movieModel.findById(id);
        if(movie) {      
            res.status(200).json({
                message: movie
            })
        }
        else {
            res.status(404).json({
                message: "movie not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
}


const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await movieModel.findByIdAndDelete(id);
        if(movie == null) {
            res.status(404).json({
                message: "movie does not exist"
            })
        }
        else {
            res.status(200).json({
                message: "movie is deleted",
                user: user
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            message: err.message
        })
    }
}





module.exports = {
    createMovie, getAllMovie, getMovieById, deleteMovie
}