var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    password: String,
    userType: String,
    id: String,
    courses: String,
    email: String,
    firstname: String,
    lastname: String,
    year: Number,
    gpa: Number,
    shoppingCart: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;