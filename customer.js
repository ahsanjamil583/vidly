const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255
    }
});

const Customer = mongoose.model('Customer', customerSchema);
function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(3).required()
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;