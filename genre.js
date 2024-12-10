const mongoose = require('mongoose');
const Joi = require('joi');

const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:50
    }
});
const Genere = mongoose.model('Genere', genereSchema);

function validateGenere(genere){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(genere);
}
module.exports.Genere = Genere;
module.exports.genereSchema = genereSchema;
module.exports.validate = validateGenere;