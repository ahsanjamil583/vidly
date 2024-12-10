// const bcrypt = require('bcrypt');
// const _ = require('lodash');
// const { Movie } = require('../models/movie');
// const { Rental } = require('../models/rental');
// const { User, validate } = require('../models/user')
// const { Customer } = require('../models/customer')
// const mongoose = require('mongoose');
// const Joi = require('joi');
// const express = require('express');
// const { Genere } = require('../models/genre');
// const router = express.Router();

 
// router.get('/', async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// });
// router.post('/', async (req, res) => {
//     // if name, email, password are invalid then 400 error will return 
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     //validation for user that user is not already register
//     let user = await User.findOne({email: req.body.email});
//     if(user) return res.status(400).send('User aleady registered..')



//     user = new User(_.pick(req.body, ['name', 'email', 'password']));
//     // Salting ensures that even if two users have the same password, their hashed passwords will be different.
//     const salt = await  bcrypt.genSalt(10);
//     user.password  = await bcrypt.hash(user.password, salt);
//     await user.save();




//     // Lodash JavaScript ki ek popular library hai jo arrays, objects, strings aur functions ke saath kaam karne ke liye utility functions provide karti hai. Ye library development process ko simplify karti hai aur code ko cleaner aur maintainable banati hai.
//     res.send(_.pick(user, ['_id', 'name', 'email']));
// });

// module.exports = router;   




















const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');
const {validate,  User } = require('../models/user')
const { Customer } = require('../models/customer')
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const { Genere } = require('../models/genre');
const router = express.Router();

 
router.get('/me', auth,  async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User aleady registered..')



    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await  bcrypt.genSalt(10);
    user.password  = await bcrypt.hash(user.password, salt);
    await user.save();


// setting response header

// iska kaam hota hai ek unique token create karna jo user ko identify kar sake. Ye token backend aur client ke beech secure communication ke liye use hota hai. e.g id
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    // res.header('x-auth-token', token)
    // Ek custom HTTP response header banata hai jiska naam x-auth-token hota hai aur us mein token variable ki value rakhta hai. Yeh aksar is liye istemal hota hai ke jab login ya registration successful ho jaye, toh authentication token client ko wapis bhejna ho.
    // Is header ka kaam client ko authentication token wapas bhejna hai, jo aksar secure communication ke liye istemal hota hai.
});

module.exports = router;    