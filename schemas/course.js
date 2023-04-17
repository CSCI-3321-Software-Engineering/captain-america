var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema = new Schema({
    courseNumber: String,
    title: String,
    professor: String,
    time: String,
    desc: String,
    creditHours: Number,
    prereqs: String,
    enrolled: Number,
    capacity: Number,
    days: String
});

var Course = mongoose.model("Course", CourseSchema);
module.exports = Course;