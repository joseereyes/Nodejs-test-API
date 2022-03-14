const mongoose = require("mongoose")


const user_schema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    createdDate: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model("users", user_schema)