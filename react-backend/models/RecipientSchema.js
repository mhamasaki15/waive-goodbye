var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var RecipientSchema = new Schema({
    email: String,
    name: String,
    status: Boolean
});


module.exports = mongoose.model('RecipientSchema',RecipientSchema);
