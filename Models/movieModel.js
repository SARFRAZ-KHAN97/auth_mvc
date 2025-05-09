const mongoose = require("mongoose");


const schemaRules = {
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    releaseYear: {
        type: Number,
        required: [true, "release Year is required"]
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
        enum: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi", "Thriller","others"]
    },
    rating: {
        type: Number,
        min: [1, "rating cant be less than 1"],
        max: [5, "rating cant be greater than 5"]
    },
    cast: [String],
    director: String,
    thumbnail: String,
    trailerLink: String,
    isPreview: {
        type: Boolean,
        default: false
    }
}


const movieSchema = new mongoose.Schema(schemaRules);

const movieModel = mongoose.model("Movie", movieSchema);


module.exports = movieModel;