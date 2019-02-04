var mongoose = require('mongoose');
var client;

function startMongoDb() {
    // mongoose.connect('mongodb://adsnb:Master123456@ds213705.mlab.com:13705/heroku_n5q86cgw', {useNewUrlParser: true});
    // mongoose.connect('mongodb://adsnb:123456e@ds213705.mlab.com:13705/heroku_n5q86cgw', {useNewUrlParser: true});
    mongoose.connect('mongodb://localhost/HelloMongoose', {useNewUrlParser: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('MongoDb Connected')
    });

    client = mongoose;
}

function mongoClient() {
    return client;
}

module.exports.startMongoDb = startMongoDb;
module.exports.mongoClient = mongoClient;
