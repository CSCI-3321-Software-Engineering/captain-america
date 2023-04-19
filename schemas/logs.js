var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LogsSchema = new Schema({
    //modifications like additons / deletions of courses & students
    title: String,
    user : String,
    timeStamp: String
});

var Logs= mongoose.model("Logs", Logschema);
module.exports = Logs;