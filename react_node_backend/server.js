//node server
'use strict'
//importing dependencies…
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

//creating instances
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var mongodbStore = require('connect-mongo')(session);
var router = express.Router();


var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds243059.mlab.com:43059/fandango', { poolSize: 10 })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', function () {
  return console.log('Successfully connected to  MongoDB Database');
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from MongoDB Database');
});
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);
module.exports = autoIncrement;

//To prevent errors from Cross Origin Resource Sharing
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


//Added to support session storing in database
var options = {
    host: 'weserveinstance.ccecdywbwqqr.us-west-1.rds.amazonaws.com',
    port: 3305,
    user: 'root',
    password: 'rootroot',
    database: 'fandango'
};

//creates sessionstore using above options
var sessionStore = new MySQLStore(options);


app.use(session({
  name: 'CMPE273 Team Project Gandango',
  // store: new mongodbStore({
  //   mongooseConnection: mongoose.connection,
  //   touchAfter: 5 * 60 * 1000
  // }),
    store: sessionStore, //stores the session in the mysql store created above
  secret: 'qwertyuiop123456789',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 30 * 60 * 100 }
}));


app.use(passport.initialize());
app.use(passport.session());

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

//configuring body parser to look for body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//initializing route and API
router.get('/', function (req, res) {
  res.json({ message: 'API Up and Running!' });

});

//Use our router configuration when we call /api
//app.use('/api', router);
// keeping routes separate
require('./app/routes/routes.js')(app);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});