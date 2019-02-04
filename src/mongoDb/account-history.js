var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountHistorySchema = new Schema({
    email: String,
    contactEmail: String,
    cardNumber: String,
    quantity: Number,
    date: Date,
    status: String
});

module.exports = mongoose.model('account-history', accountHistorySchema);
