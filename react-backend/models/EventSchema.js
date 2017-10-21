var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    createdBy: String,
    name: String,
    date: String,
    recepients: String

});



module.exports = mongoose.model('EventSchema', EventSchema);
