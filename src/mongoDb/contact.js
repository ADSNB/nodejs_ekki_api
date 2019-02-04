var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    email: String,
    name: String,
    contactEmail: String,
    favorite: String
});

module.exports = mongoose.model('contact', contactSchema);
