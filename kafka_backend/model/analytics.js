'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoServices = require('../services/mongo');
var autoIncrement = mongoServices.autoIncrement;

var AnalyticsSchema = new Schema({
    user_id: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    session: [{
        pages: [{type: String}] ,
        pageTime: [{ type: Number }],
        date_added: { type: Date, default: Date.now },
    }],
});

//export our module to use in other file
AnalyticsSchema.plugin(autoIncrement.plugin, 'User Tracking');
module.exports = mongoose.model('User Tracking', AnalyticsSchema);