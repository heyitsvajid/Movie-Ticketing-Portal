'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('../../server.js'); 

var UserSchema = new Schema({
    name:  { type: String, trim: true, required: true }, 
    email:  { type: String, lowercase: true, trim: true, index: true, required: true },
    password: { type: String, required: true, bcrypt: true},
    phone: {type: String, default:''},
    skills: [{type: String, default: ''}],
    about: {type: String, default: ''},
    profile: {type: String, default: ''},
    registration:  {type: Date, default: Date.now},
    account_balance: {type: Number, default: 0}
});

//export our module to use in server.js
UserSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', UserSchema);