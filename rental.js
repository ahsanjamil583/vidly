const mongoose = require('mongoose');
const Joi = require('joi');

const { genereSchema } = require('./genre');
const { customerSchema } = require('./customer')
const { movieSchema } = require('./movie')
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255,
            },
            numberInStock: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
});
const Rental = mongoose.model('Rental', rentalSchema);
function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
    return schema.validate(rental);
}
module.exports.Rental = Rental;
// module.exports.movieSchema = movieSchema;
// module.exports.customerSchema = customerSchema;
module.exports.validate = validateRental;