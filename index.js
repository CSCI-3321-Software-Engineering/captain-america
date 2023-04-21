require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", courseRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        app.listen(process.env.HOST_PORT);
        console.log(
            `listening on: localhost:${process.env.HOST_PORT}`
        );
    },
    (err) => {
        console.log("mongo db connection failed");
    }
);


module.exports = app;