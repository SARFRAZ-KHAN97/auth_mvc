const mongoose = require("mongoose");
  
  //create user
const schemaRules = {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        email: {
            type: String,
            required: [true , "email is required"],
            unique: [true, "email should be unique"]
        },
        password: {
            type: String,
            required: [true, "Paswod is required"],
            minLength: [6, "Password should be atleast 6 length"]
        },
        confirmPassword: {
            type: String,
            required: true,
            //custom validation
            validate: [ function () {
                return this.password == this.confirmPassword;
            }, "Password should be same" ]
        },
        craetedAt: {
            type: Date,
            default: Date.now()
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["user","admin","feed curator","moderator"],  //possilble values for role
            default: "user"
        },
        otp: {
            type: Number
        },
        otpExpiry: {
            type: Date
        }
}

const userSchema = new mongoose.Schema(schemaRules);


/*  (pre) hooks in Mongo db   */
userSchema.pre("save", function (next) {
    this.confirmPassword = undefined;
    next();
})

/*  (post) hooks in Mongo db   */
userSchema.post("save", function () {
    //this_id=undefined;
    this.__v=undefined;  // Post hooks in Mongoose
    this.password=undefined;  //do not modify the saved document.
}) //this.password = undefined has no effect on what’s stored in MongoDB



const userModel = mongoose.model("users",userSchema);

module.exports = userModel;



// If you want to remove fields like password or __v before sending a user object in a response, you should do it when converting to JSON (not inside post-save hooks):


// userSchema.methods.toJSON = function () {
//     const userObj = this.toObject();
//     delete userObj.password;
//     delete userObj.__v;
//     return userObj;
// };
// Then in your route:


// res.status(200).json({
//     user: savedUser // `password` and `__v` will be removed automatically
// });