var account;
var ac;
var account2;

function resolveRepository(config) {
    resolveAccount();
    if (config.database === 'mongoDb') {
        account = require('./mongoDb/repository/account');
        ac = account;
    }
    else if (config.database === 'neo4j') {
        console.error('Not implemented database');
    }
    else {
        console.error('Not implemented database');
    }
}

function verifyDb(file) {
    if (global.config === undefined)
    {
        return null;
    }
    if (global.config.database === 'mongoDb') {
        account2 = require('./mongoDb/repository/' + file);
    }
    else if (global.config.database === 'neo4j') {
        console.error('Not implemented database');
    }
    else {
        console.error('Not implemented database');
    }
}

const resolveAccount = () => verifyDb('account');


module.exports.resolveRepository = resolveRepository;
module.exports.resolveAccount = resolveAccount;
module.exports.Account = account;
module.exports.account2 = account2;
module.exports.Ac = ac;

// module.exports = {
//     account: require(global.config ? global.config.db : ''),
//     resolveRepository
// }
