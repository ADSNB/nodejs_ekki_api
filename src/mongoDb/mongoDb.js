var mongoose = require('mongoose');

function startMongoDb() {

    mongoose.connect(global.config.mongoDbConnection, {useNewUrlParser: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDb connection error:'));

    db.once('open', function() {
        console.log('MongoDb connected')
    });
}

module.exports.startMongoDb = startMongoDb;
