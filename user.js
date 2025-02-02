const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        minlength:3,
        maxlength:50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength:3,
        maxlength:255,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:1024,
    },
    idAdmin: Boolean 
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;