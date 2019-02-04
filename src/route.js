const contact = require('./controllers/contact');
const creditCard = require('./controllers/credit-card');
const account = require('./controllers/account');
const accountHistory = require('./controllers/account-history');

function startRoutes(app) {
    console.log('Resolving app routes');
    app.use('/contact/', contact);
    app.use('/credit-card/', creditCard);
    app.use('/account/', account);    
    app.use('/account-history/', accountHistory);
}

module.exports.startRoutes = startRoutes;