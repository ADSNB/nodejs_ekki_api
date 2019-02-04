const express = require('express');
const app = express();
const cors = require('cors');
const requestHandler = require('./request-handler');
// const db = require('./redis');
const db = require('./mongoDb');
const route = require('./route');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
requestHandler.authenticate(app);
db.startMongoDb();
route.startRoutes(app);
requestHandler.resolveResponse(app);
app.listen(3000);
