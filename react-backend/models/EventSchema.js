var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    createdBy: String,
    name: String,
    date: String,
    recipients: [[{type:mongoose.Schema.Types.ObjectId, ref: 'RecipientSchema'}]]



});



module.exports = mongoose.model('EventSchema', EventSchema);
