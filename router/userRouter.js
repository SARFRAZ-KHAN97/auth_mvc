const express = require('express');


const userRouter = express.Router();



const {protectedRouteMiddleware, isAdminMiddleware} = require("../controllers/authController");
const {createUser, getAllUser, getUserById, deleteUser} = require("../controllers/userController");

userRouter
    .post("/", createUser) 
    .get("/",protectedRouteMiddleware, isAdminMiddleware, getAllUser)
    .get("/:id",getUserById)
    .delete("/:id",deleteUser)



module.exports = userRouter;
