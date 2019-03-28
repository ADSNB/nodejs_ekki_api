var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('account', accountSchema);
