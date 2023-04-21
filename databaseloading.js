require('dotenv').config();
const { default: mongoose } = require("mongoose");
const csv = require('jquery-csv');

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const courseSchema = mongoose.Schema({
    course_name: {type: String, required: true},
    course_time: String,
    course_location: String,
    pathways: [String],
    prerequisites: [this]
});

const studentSchema = mongoose.Schema({
    student_id: {type: Number, required: true},
    name: String,
    year: Number,
    courses: [courseSchema]
});

// const Courses = mongoose.model('Course', courseSchema);
// const Students = mongoose.model('Student', studentSchema);

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

const reader = new FileReader()


