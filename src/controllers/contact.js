const express = require('express');
var router = express.Router();
var Contact = require('../mongoDb/contact');
var Account = require('../mongoDb/account');
const { check, validationResult } = require('express-validator/check');

router.get('/', 
        [
            check('email').isEmail().withMessage('E-mail must be valid')
        ],
        async (req, res, next) => {
        console.log('Accessing GET contact controller');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            next(errors.array());
        }

        Contact.find({ 'email' : req.query.email }, (err, contact) => {
            try {
                if (err) {
                    console.log(err);
                    next(err);
                }       

                res.send(contact);
            } catch (error) {
                res.status(400);
                next(error);
            }
            
        });
});

router.get('/id', 
        [
            check('email').isEmail().withMessage('E-mail must be valid')
        ],
        async (req, res, next) => {
        console.log('Accessing GET contact controller');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422);
            next(errors.array());
        }

        Contact.find({ 'contactEmail' : req.query.email }, (err, cards) => {
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
        console.log('Accessing GET ALL contact controller');

        Contact.find((err, contacts) => {
            if (err) 
                return console.error(err);
            
            res.send(contacts);
        })
    } catch (error) {
        next(error);
    }    
});

router.put('/put', async (req, res, next) => {
    try {
        console.log('Accessing PUT contact controller');
        db.HSET(`account:alan.bernd`, 'name', 'Alan', 'email', 'adsnb.alan@gmail.com');
        res.send('PUT ok')
    } catch (error) {
        next(error);
    }
});

router.post('/',
        [
            check('name').isLength( {min: 1} ).withMessage('Type the name of your contact'),
            check('contactEmail').isEmail().withMessage('E-mail must be valid')
        ],
    async (req, res, next) => {
        try {
            console.log('Accessing POST contact controller');

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422);
                next(errors.array());
            } else {
                Account.findOne({ 'email' : req.body.contactEmail }, (err, account) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    if (!account) {
                        res.status(400);
                        next("User not found");
                    } else {
                        var newContact = new Contact({
                            name: req.body.name,
                            contactEmail: req.body.contactEmail,
                            favorite: req.body.favorite,
                            email: req.body.email
                        });
            
                        newContact.save((err, contact) => {
                            if (err) { 
                                return console.error(err);
                            } else {
                                res.send(contact);
                            }
                        })}
                })} 
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/', async (req, res, next) => {
    try {
        console.log('Accessing DELETE contact controller');

        Contact.deleteOne({contactEmail: req.query.contactEmail, email: req.query.email }, (err) => { 
            if (err) 
                return console.error(err); 
        });

        res.send('Delete ok')

    } catch (error) {
        next(error);
    }
});

module.exports = router;
