const express = require('express');
var router = express.Router();
var CreditCard = require('../mongoDb/models/credit-card');
const { check, validationResult } = require('express-validator/check');

router.get('/', 
        [
            check('email').isEmail().withMessage('E-mail must be valid')
        ],
        async (req, res, next) => {
        console.log('Accessing GET account controller');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            next(errors.array());
        }

        CreditCard.find({ 'email' : req.query.email }, (err, cards) => {
            try {
                if (err) {
                    console.log(err);
                    next(err);
                }       

                res.send(cards);
            } catch (error) {
                res.status(400);
                next(error);
            }
            
        });
});

router.get('/getAll', async (req, res, next) => {
    try {
        console.log('Accessing GET ALL credit-card controller');

        CreditCard.find((err, cc) => {
            if (err) 
                return console.error(err);
            
            res.send(cc);
        })
    } catch (error) {
        next(error);
    }    
});

router.post('/',
        [
            check('email').isEmail().withMessage('Must type a valid e-mail'),
            check('name').isLength( {min: 1} ).withMessage('Type your name'),
            check('password').isLength({ min: 4 }).withMessage('Password must be informed and have 4 characters')
            .custom((value,{req}) => {
                if (value !== req.body.passwordConfirmation) {
                    throw new Error("Passwords don't match");
                } else {
                    return value;
                }
            }),
        ],
    async (req, res, next) => {
        try {
            console.log('Accessing POST credit-card controller');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422);
                next(errors.array());
            } else {
            var newCC = new CreditCard({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                number: generateCreditCardNumber(),
                securityCode: generateSecurityCodeNumber()
            });

            newCC.save((err, cc) => {
                if (err) { 
                    return console.error(err);
                } else {
                    res.send(cc);
                }
            })}
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/', async (req, res, next) => {
    try {
        console.log('Accessing DELETE credit-card controller');

        CreditCard.deleteOne({number: req.query.number }, (err) => { 
            if (err) 
                return console.error(err); 
        });

        res.send('Delete ok')

    } catch (error) {
        next(error);
    }
});

function generateCreditCardNumber() {
    var x = 0;
    var number = '';
    while (x != 16) {
        number = number + getRandomInt(0,9);
        x++;
    }
    return number;
}

function generateSecurityCodeNumber() {
    var x = 0;
    var number = '';
    while (x != 4) {
        number = number + getRandomInt(0,9);
        x++;
    }
    return number;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCreditCard(email) {
    return new Promise( (resolve, reject) => {
        CreditCard.findOne({ 'email' : email }, (err, card) => {
            if (err) {
                console.log(err);
                next(err);
            }       

            if (card) 
                resolve(card);
            else
                reject('It looks like you do not have a credit card yet. Create a new one to be able to transfer above account balance');
        })
    })
};

module.exports = router;
module.exports.getCreditCard = getCreditCard;
module.exports.generateCreditCardNumber = generateCreditCardNumber;
module.exports.generateSecurityCodeNumber = generateSecurityCodeNumber;
