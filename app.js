const express = require("express")
const dotenv = require("dotenv")
const router = require("./router/router")
const cors = require("cors");
const config = require("./config/default")

const app = express();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

app.listen(config.server.PORT, () => {
    console.log("Started on port " + config.server.PORT);
    config.db()
})