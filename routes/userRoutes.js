const express = require("express");
const moment = require("moment/moment");
const bodyParser = require("body-parser");
const Logs = require("../schemas/logs");
const User = require("../schemas/user");

const userRoutes = express.Router();

userRoutes.use(bodyParser.json());
userRoutes.use(bodyParser.urlencoded({ extended: false }));

userRoutes.post("/userinfo", (req, res) => {
    const data = req.body;
    if (!data.user) {
        return res
            .status(400)
            .send({ error: "User parameter missing in request" });
    }
    let log = new Logs({
        title: "User info accessed",
        user: data.user,
        timeStamp: moment().format("MM-DD-yyyy HH:mm:ss"),
    });
    log.save();
    User.findOne({ username: data.user }).exec(
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "User not found" });
            }
            return res.json(user);
        }
    );
});


userRoutes.post("/login", (req, res) => {
    const data = req.body;
    if (data.user == null) {
        return res
            .status(400)
            .send({ error: "User parameter missing in request" });
    }
    if (data.pass == null) {
        return res
            .status(400)
            .send({ error: "Password parameter missing in request" });
    }
    let log = new Logs({
        title: "User login attempted",
        user: data.user,
        timeStamp: moment().format("MM-DD-yyyy HH:mm:ss"),
    });
    log.save();
    User.findOne({ username: data.user }).exec(
        (err, user) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }
            if (!user) {
                return res
                    .status(401)
                    .send({ error: "User not found" });
            }
            if (user.password === data.pass) {
                return res.json({
                    valid: true,
                    userType: user.userType,
                });
            } else {
                return res
                    .status(401)
                    .send({ error: "User not found", valid: false });
            }
        }
    );
});

module.exports = userRoutes;
