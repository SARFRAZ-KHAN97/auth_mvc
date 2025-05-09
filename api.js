const mongoose = require("mongoose");
const express = require ("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");



dotenv.config();   //dotenv.config({path: paste_relative_path})  => env ke variables



//db connection
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uhvcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err))



 //create user

const userModel = require("./Models/userModel")


app.use(express.json());
app.use(cookieParser());

/* forMongoDB :--
create -> userModel.create(object);
getAll -> userModel.find();
getById ->userModel.findbyId(id);
deleteById ->userModel.findByIdAndDelete(id);
*/


app.use("/", function(req, res) {
  res.status(200).send("Welcome to my API");
})


app.use("/hi", function(req, res) {
  res.status(200).send("Hello my friend");
})
//Handler functions ->users



/*methods and routes of auth */
const authRouter = require("./router/authrRouter.js");

app.use("/api/auth", authRouter);



// user Routes
const userRouter = require("./router/userRouter.js");

app.use("/api/users", userRouter);


/*  Movies routes and their handlers   */
const movieRouter = require("./router/movieRouter.js");

app.use("/api/movies", movieRouter);






  const PORT= process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
