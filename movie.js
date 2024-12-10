const mongoose = require('mongoose');
const Joi = require('joi');
const objectId = require('joi-objectid')(Joi)

const { genereSchema } = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255,
    },
    genere: {
        type: genereSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max:255
    }
});
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genereId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });
    return schema.validate(movie);
}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;