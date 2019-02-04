var redis = require('redis');
var client;
// start stop redis server commands
// /etc/init.d/redis-server stop
// /etc/init.d/redis-server start

function startRedis() {
    // localhost server, this creates a new client 127.0.0.1 and port 6379
    var client = redis.createClient();
    
    // var client = redis.createClient(port, host);
    
    // Redis Authentication
    client.auth('c9c3NRkMtIeHxSjiViMGvGjO5YrXiCmF')

    client.on('connect', function() {
        console.log('Trying to connect on redis server');
    });

    client.on('ready', function() {
        console.log('Redis connected with success');
    });

    client.on('error', function (err) {
        console.log('Something went wrong ' + err);
        process.exit();
    });
}

function redisClient() {
    return client;
}

module.exports.startRedis = startRedis;
module.exports.redisClient = redisClient;
