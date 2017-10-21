var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RecipientSchema = require("./RecipientSchema");

var EventSchema = new Schema({
    createdBy: String,
    name: String,
    date: String,
    recipients: [RecipientSchema]



});



module.exports = mongoose.model('EventSchema', EventSchema);
