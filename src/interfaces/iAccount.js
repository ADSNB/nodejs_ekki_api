var initialized = Boolean(false);
var account;

function init() {
    if (global.config.database === 'mongoDb') {
        account = require('../mongoDb/repository/account');
    }
    else if (global.config.database === 'neo4j') {
        console.error('Not implemented database');
    }
    else {
        console.error('Not implemented database');
    }
}


function authenticate(req, res, next) {
    if (!initialized) init();
    return account.authenticate(req, res, next);
}

module.exports.authenticate = authenticate;
