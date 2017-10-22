var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var RecipientSchema = new Schema({
    email: String,
    name: String,
    status: Boolean,
    tripId: {type: Schema.Types.ObjectId, ref: 'EventSchema'},
    documentUrl: String
});


module.exports = mongoose.model('RecipientSchema',RecipientSchema);
