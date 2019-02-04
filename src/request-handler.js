function authenticate(app) {
    app.all('/*', function(req, res, next) {
        req.requestTime = Date.now();
        console.log(`Incoming request`);
        if (req.headers.token === '123456') {
            console.log('Access granted');
            next();
        } else {
            console.log('Access denied');
            res.status(401).send('Access denied');
        }
    });
}

function resolveResponse(app) {
    app.use(function(err, req, res, next) {
        if (err) {
            console.error(`General error: ${err.stack}`);
            if (!res.statusCode) {
                res.status(500).send(JSON.stringify(new CreateErrorMessage(err, err.stack)));
            } else if (res.statusCode === 422) {   
                res.send(JSON.stringify(new createValidationErrorMessage(err)));
            } else {
                res.send(JSON.stringify(new CreateErrorMessage(err)));
            }
        }
    });
}

function createValidationErrorMessage(err) {
    var array = new Array;
    err.forEach(erro => {
        array.push(erro.msg);
    });
    this.Description = array;
    this.StackTrace = '';
}

function CreateErrorMessage(description) {
    var array = new Array;
    array.push(description);
    this.Description = array;
    this.StackTrace = '';;
};

module.exports.resolveResponse = resolveResponse;
module.exports.authenticate = authenticate;
