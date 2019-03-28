var account = require('../models/account');

function authenticate(req, res, next) {
    account.findOne({ 'email' : req.query.email }, (err, account) => {
        try {
            if (err) {
                console.log(err);
                return next(err);
            }
        
            if (account.password === req.query.password) {
                return res.send(account);
            } else {
                res.status(401);
                return next('Password is incorrect');
            }
        } catch (error) {
            res.status(400);
            return next(error);
        }
    });
}

module.exports.authenticate = authenticate;
