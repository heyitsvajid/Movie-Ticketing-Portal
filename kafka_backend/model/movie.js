'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoServices = require('../services/mongo');
var autoIncrement = mongoServices.autoIncrement;

var MovieSchema = new Schema({
    title: { type: String, index: true, trim: true, required: true },
    trailer_link: { type: String, required: true },
    movie_characters: [{
        name: { type: String },
        image_path: { type: String }
    }],
    release_date: { type: Date },
    mpaa_ratings: [{ type: String}],
    movie_keywords: [{ type: String}],
    movie_logo:  {type: String}  ,
    movie_length: {type: Number},
    movie_definition: { type: String},
    synopsis:{type: String,required:true,default:'Untitled'},
    review_ratings: [{
        rating:{ type: Number },
        review:{ type: String },
        user_id:{ type: Number },
        user_name:{ type: String },
        likes_count:{ type: Number,default: 0},
        title:{ type: String,default:'Untitled' },
        date_added:{type:Date, default: Date.now},

    }],
    number_clicks:{ type: Number, default: 0 },
    date_added:{type:Date, default: Date.now},
});

//export our module to use in other file
MovieSchema.plugin(autoIncrement.plugin, 'Movie');
module.exports = mongoose.model('Movie', MovieSchema);