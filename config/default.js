const mongoose = require("mongoose")


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