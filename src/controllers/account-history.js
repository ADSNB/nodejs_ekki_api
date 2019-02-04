const express = require('express');
var router = express.Router();
var AccountHistory = require('../mongoDb/account-history');
const { check, validationResult } = require('express-validator/check');
var CreditCard = require ('./credit-card');

router.get('/', 
    [
        check('email').isEmail().withMessage('E-mail must be valid')
    ],
    async (req, res, next) => {
        console.log('Accessing GET account history controller')

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        next(errors.array());
    }

    AccountHistory.find({ 'email' : req.query.email }, (err, history) => {
        try {
            if (err) {
                console.log(err);
                next(err);
            }
            res.send(history);
        } catch (error) {
            res.status(400);
            next(error);
        }
        
    });
});

router.get('/getAll', async (req, res, next) => {
    try {
        console.log('Accessing GET account controller');

        AccountHistory.find((err, accounts) => {
            if (err) 
                return console.error(err);
            
            res.send(accounts);
        })
    } catch (error) {
        next(error);
    }    
});

router.get('/getBalance', 
    [
        check('email').isEmail().withMessage('E-mail must be valid')
    ],
    async (req, res, next) => {
        console.log('Accessing GET Balance account history controller')

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        next(errors.array());
    }
    res.send(res.send(JSON.stringify(await getCurrentBalance(req.query.email))));
});

function getCurrentBalance(email) {
    return new Promise( (resolve, reject) => {
        var incomeList = 0;
        var outcomeList = 0;

        AccountHistory.find({ 'email' : email, 'status' : 1 }, (err, history) => {
            if (err) {
                console.log(err);
                next(err);
            }
            if (history.length > 0){
                history.forEach(item => {
                    incomeList = incomeList + item.quantity;
                })
            }
        }).then( (ana) => {
            AccountHistory.find({ 'email' : email, 'status' : 0 }, (err, history) => {
                if (err) {
                    console.log(err);
                    next(err);
                }
                if (history.length > 0){
                    history.forEach(item => {
                        outcomeList = outcomeList + item.quantity;
                    })
                }
            }).then( (alan) => {
                var total = incomeList - outcomeList;
                resolve(total);
            });
        });
    });
}

router.post('/',
        [
            check('email').isEmail().withMessage('E-mail must be valid'),
            check('contactEmail').isEmail().withMessage('Contact e-mail must be valid'),
            check('quantity').isLength({ min:3 }).withMessage('Password must be informed')
        ],
    async (req, res, next) => {
        try {
            console.log('Accessing POST account history controller');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422);
                next(errors.array());
            } else {

            var currentBalance = await getCurrentBalance(req.body.email);
            var cardNumber = '';
            if (req.body.quantity > currentBalance)
                cardNumber = await CreditCard.getCreditCard(req.body.email);

            var outcome = new AccountHistory({
                email: req.body.email,
                contactEmail: req.body.contactEmail,
                cardNumber: cardNumber.number, 
                quantity: req.body.quantity,
                date: new Date,
                status: 0
            });

            outcome.save((err, newOutcome) => {
                if (err) { 
                    return console.error(err);
                } else {
                    // res.send(newOutcome);
                }
            });

            var income = new AccountHistory({
                email: req.body.contactEmail,
                contactEmail: req.body.email,
                cardNumber: '',
                quantity: req.body.quantity,
                date: new Date,
                status: 1
            });

            income.save((err, newIncome) => {
                if (err) { 
                    return console.error(err);
                } else {
                    res.send(newIncome);
                }
            });
        }
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
);

module.exports = router;
