const express = require("express");
const moment = require("moment/moment");
const User = require("../schemas/user");
const Course = require("../schemas/course");
const Logs = require("../schemas/logs");

const router = express.Router();

router.post("/getcourses", (req, res) => {
    const data = req.body;
    if (data.user == null) {
        return res.status(400).send({ error: "User parameter missing in request" });
    }
    if (data.registration == null) {
        return res
            .status(400)
            .send({ error: "Registration parameter missing in request" });
    }
    let log = new Logs({
        title: "User courses accessed",
        user: data.user,
        timeStamp: moment().format("MM-DD-yyyy HH:mm:ss"),
    });
    log.save();
    User.findOne({ username: data.user }).exec((err, user) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!user) {
            return res.status(401).send({ error: "User not found" });
        }
        if (data.registration) {
            return res.json({ courses: user.shoppingCart });
        } else {
            return res.json({ courses: user.courses });
        }
    });
});

router.post("/getcourse", (req, res) => {
    const data = req.body;
    let log = new Logs({
        title: "Single course accessed",
        user: data.user,
        timeStamp: moment().format("MM-DD-yyyy HH:mm:ss"),
    });
    log.save();
    Course.findOne({ courseNumber: data.courseNumber }).exec((err, course) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (!course) {
            return res.status(401).send({ error: "Course not found" });
        }
        return res.send(course);
    });
});

module.exports = router;
