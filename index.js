require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment/moment');
const bodyParser = require('body-parser');
const { result } = require('underscore');
const mongoose = require("mongoose");
const User = require('./schemas/user');
const Course = require('./schemas/course');

const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/userinfo', (req,res) => {
    User.findOne({username: req.body.user}).exec((err, user) => {
        res.json(user);
        console.log(user.password);
    });
})

app.post('/api/getcourses', (req,res) => {
    User.findOne({username: req.body.user}).exec((err, user) => {
        if (req.body.registration) {
            res.json({courses: user.shoppingCart});
        } else {
            res.json({courses: user.courses});
        }
    });    
});

app.post('/api/getcourse', (req,res) => {
    Course.findOne({courseNumber: req.body.courseName}).exec((err,course) => {
        if (course !== null)
            res.send(course);
    });
});


app.post('/api/login', (req, res) => {
    const data = req.body;
    User.findOne({username: data.user}).exec((err, user) => {
        if (user !== null && 
           (user.password === data.pass)) {
                res.json({
                    valid: true,
                    userType: user.userType
                });
        } else {
            res.json({valid: false});
        }
    });
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI).then(
    () => { 
        app.listen(process.env.HOST_PORT); 
        console.log(`listening on: localhost:${process.env.HOST_PORT}`);
    },
    (err) => { console.log("mongo db connection failed") }
)

module.exports = app;
