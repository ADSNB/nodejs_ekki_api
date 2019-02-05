const express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    res.send(global.config);
});

module.exports = router;
