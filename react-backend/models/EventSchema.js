var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    createdBy: String,
    name: String,
    date: String,
});



module.exports = mongoose.model('EventSchema', EventSchema);
