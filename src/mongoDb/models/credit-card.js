var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    email: String,
    name: String,
    password: String,
    number: String,
    securityCode: String
});

module.exports = mongoose.model('credit-card', accountSchema);
