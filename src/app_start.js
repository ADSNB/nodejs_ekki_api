const config = require('./config.json');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const route = require('./route');
const db = require('./mongoDb/mongoDb');
const requestHandler = require('./request-handler');

// get app configuration
global.config = config.development;

// activate CORS (cross origin resource sharing)
app.use(cors());

// activate the bodyparser json/urlencoded used to get (.body) property in request
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// authenticate the client requisition
requestHandler.authenticate(app);

// start the mongo database
db.startMongoDb();

// initiate the express routes
route.startRoutes(app);

// format and return the http response to client
requestHandler.resolveResponse(app);

// initiate the express api on port x
app.listen(global.config.node_port);
