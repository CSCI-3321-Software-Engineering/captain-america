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
    days: String,
    pathways: String,
    department: String,
    level: Number
});

var Course = mongoose.model("courses", CourseSchema);
module.exports = { Course, CourseSchema };