const express = require('express');
var router = express.Router();
var Account = require('../mongoDb/account');
const { check, validationResult } = require('express-validator/check');

router.get('/', 
        [
            check('email').isEmail().withMessage('E-mail must be valid'),
            check('password').isLength({ min:3 }).withMessage('Password must be informed')
        ],
        async (req, res, next) => {
        console.log('Accessing GET account controller');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            next(errors.array());
        }

        Account.findOne({ 'email' : req.query.email }, (err, account) => {
            try {
                if (err) {
                    console.log(err);
                    next(err);
                }
            
                if (account.password === req.query.password) {
                    res.send(account);
                } else {
                    res.status(401);
                    next('Password is incorrect');
                }
            } catch (error) {
                res.status(400);
                next(error);
            }
            
        });
});

router.get('/getAll', async (req, res, next) => {
    try {
        console.log('Accessing GET account controller');

        Account.find((err, accounts) => {
            if (err) 
                return console.error(err);
            
            res.send(accounts);
        })
    } catch (error) {
        next(error);
    }    
});

router.post('/',
        [
            check('name').isLength( {min: 1} ).withMessage('Type your name'),
            check('email').isEmail().withMessage('E-mail must be valid'),
            check('password').isLength({ min: 3 }).withMessage('Password must be informed and have at least 3 characters')
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
            console.log('Accessing POST account controller');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422);
                next(errors.array());
            } else {
                Account.findOne({ 'email' : req.body.email }, (err, account) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    if (account) {
                        res.status(400);
                        next("E-mail already exist");
                    } else {
                        var newAcc = new Account({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        });
            
                        newAcc.save((err, newAccount) => {
                            if (err) { 
                                return console.error(err);
                            } else {
                                res.send(newAccount);
                            }
                        })}
                })} 
        } catch (error) {
            next(error);
        }
    }
);

router.put('/', async (req, res, next) => {
    try {
        console.log('Accessing PUT account controller');
        res.send('PUT ok')
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        console.log('Accessing DELETE account controller');
        Account.deleteOne({email: 'adsnb.alan@gmail.com' }, (err) => { 
            if (err) 
                return console.error(err); 
        });
        res.send('Delete ok')
    } catch (error) {
        next(error);
    }
});

// function getNextId() {
//     return new Promise( (resolve, reject) => {
//         db.get('accountId', function (error, result) {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             } else {
//                 if (result === null || result === 0) {
//                     db.SET('accountId', 1);
//                     resolve(1);
//                 } else {
//                     db.INCR('accountId')
//                     resolve(result[0]);
//                 }
//             }
//         });
//     });
// }

// function getAll(account){
//     return new Promise( (resolve, reject) => {
//         db.HGETALL(account, function (error, result) {
//             if (error) {
//                 console.log(error);
//                 reject(error);
//             }
//             console.log('GET result ->' + JSON.stringify(result));
//             resolve(JSON.stringify(result));
//         });
//     });
// }

module.exports = router;
