//Handler functions ->users

const userModel = require("./../Models/userModel");

const createUser = async function (req, res) {
    try {
        const userObject = req.body;

        const user = await userModel.create(userObject);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}


const getAllUser = async (req, res) => {
    try {
        const user = await userModel.find();
        if(user.length!=0) {
            res.status(200).json({
                message: user
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


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(user) {
            user.password=undefined; 
            user.__v=undefined;
            
            res.status(200).json({
                message: user
            })
        }
        else {
            res.status(404).json({
                message: "User not found"
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


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if(user == null) {
            res.status(404).json({
                message: "User does not exist"
            })
        }
        else {
            res.status(200).json({
                message: "User is deleted",
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
    createUser, getAllUser, getUserById, deleteUser   
}


/* 
when value pair same in js can write like this too  or else
      or
createUSer: createUSer,
getAllUser: getAllUser,
getUSerById: getUSerById,
deleteUSer: deleteUSer
*/