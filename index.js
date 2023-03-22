require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment/moment');
const bodyParser = require('body-parser');
const { result } = require('underscore');
const mongoose = require("mongoose");


const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const logins = {
    "student": "123",
    "professor": "123",
    "admin": "123"
};

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const courseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    course_time: String,
    course_location: String,
    pathways: [this]

});

const studentSchema = new mongoose.Schema({
    student_id: { type: Number, required: true },
    name: String,
    year: Number,
    courses: [courseSchema]
});

const Course = mongoose.model('Course', courseSchema);
const Student = mongoose.model('Student', studentSchema);

// const student = new Student({
//     student_id: 123,
//     name: "John Doe",
//     year: 2,
//     courses: []
// })
// student.save().then(
//     () => console.log("added student entry"),
//     (err) => console.log(err)
// );

app.get('/testDB', (req, res) => {
    Student.find({}, (err, found) => {
        if (err) {
            console.error("Error occured: " + err);
            return res.status(500).send(err);
        }
        res.send(found);
    });
});

app.post('/login', (req, res) => {
    const data = req.body;
    const username = data.user;
    const password = data.pass;

    const validLogin = logins[username] == password;

    res.json({ valid: validLogin });
});

app.get('/', (req, res) => {
    res.json({ msg: 'Hello World' });
});

app.get('/api', (req, res) => {
    res.json({ msg: 'Hello from captain-america' });
});

app.get('/api/*', (req, res) => {
    res.json({ msg: 'hello this is /api/' });
});

module.exports = app;
