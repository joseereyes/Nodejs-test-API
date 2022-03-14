const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

module.exports = {

    async db() {

        try {

            await mongoose.connect(process.env.DB_STRING)
            console.log("Connected to db.")

        } catch (error) {

            console.log(error)

        }

    },

    server: {
        PORT: process.env.PORT || 5000
    }


}