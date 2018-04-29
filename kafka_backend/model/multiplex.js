'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoServices = require('../services/mongo');
var autoIncrement = mongoServices.autoIncrement;

var MultiplexSchema = new Schema({
    name: { type: String, index: true, trim: true, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    contact_number: { type: Number, required: true },
    multiplex_owner_id: { type: Number, required: true },
    multiplex_logo: { type: String, required: true },
    amenities: { type: String, required: true },
    screens: [{
        screen_number: { type: Number },
        seat_count: { type: Number },
        row_count: { type: Number },
    }],
    show_timings: [
        {
            screen_number: { type: String },
            screen_id:{ type: String }, 
            date_time: { type: String },
            sort_field:{type:Number},
            seats_left: { type: Number },
            movie: { type: Object },//(for now, if we get data from cache/ add   whole movie obj), 
            price: { adult: { type: Number }, child: { type: Number }, disabled: { type: Number },student:{type:Number} }
        }],
    date_added: { type: Date, default: Date.now },
});

//export our module to use in other file
MultiplexSchema.plugin(autoIncrement.plugin, 'Multiplex');
module.exports = mongoose.model('Multiplex', MultiplexSchema);