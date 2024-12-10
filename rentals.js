const { Movie } = require('../models/movie');
const { validate, Rental} = require('../models/rental');
// const { Genere } = require('../models/genre')
const { Customer } = require('../models/customer')
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rental = await Rental.find();
    res.send(rental);
});
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('The rental was not found with the given id..');
    res.send(rental);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id:movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
            numberInStock:movie.numberInStock
        }
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
});

// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     const customer = await Customer.findById(req.body.customerId);
//     if(!customer) return res.status(404).send('Invalid Customer.');

//     const movie = await Genere.findById(req.body.movieId);
//     if(!movie) return res.status(404).send('Invalid movie.');

//     const rental = await Rental.findByIdAndUpdate(req.params.id, {
//         customer: {
//             _id: customer._id,
//             name:req.body.name,
//             phone:req.body.phone
//         },
//         movie: {
//             _id:movie._id,
//             title: req.body.title,
//             numberInStock: req.body.numberInStock,
//             dailyRentalRate: req.body.dailyRentalRate
//         }
//     })
//     res.send(rental);
// });


module.exports = router;