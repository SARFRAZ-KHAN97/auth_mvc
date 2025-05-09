const express = require('express');


const authRouter = express.Router();

//auth handler functions

const {signUpHandler, loginHandler, protectedRouteMiddleware, profileHandler, logoutHandler, forgetPasswordHandler, resetPasswordHandler} = require("../controllers/authController");


//auth routes
authRouter
    .post("/login", loginHandler)
    .post("/signup", signUpHandler)
    .get("/logout", logoutHandler)
//app.use(protectedRouteMiddleware);
    .get("/profile", protectedRouteMiddleware, profileHandler)  // can use middleware like this in front of routes to implement
    .patch("/forgetPassword", forgetPasswordHandler)
    .patch("/resetPassword/:userId", resetPasswordHandler);

module.exports = authRouter;