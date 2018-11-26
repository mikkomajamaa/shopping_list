const express = require('express');
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

var routes = require('./routes/index.js');
app.use('/', routes);


/// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://dbuser:dbpassword1@ds253783.mlab.com:53783/local_library';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.use(morgan(`:method :url :body :status ${'-'} :response-time ${'ms'}`));


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
