
//DB Config
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds221609.mlab.com:21609/freelancer', {poolSize: 10})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('connected', function () {
  console.log(db)
  return console.log('Successfully connected to  MongoDB Database');

});

db.once('disconnected', function () {
  return console.error('Successfully disconnected from MongoDB Database');
});

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);
exports.autoIncrement = autoIncrement; 
exports.db = db;