const { validate, Movie} = require('../models/movie');
const { Genere } = require('../models/genre')
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({title:1});
    res.send(movies)
});
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('The customer was not fiund with the given id...');
    res.send(movie);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genere = await Genere.findById(req.body.genereId);
    if(!genere) return res.status(404).send('Invalid Genere');

    const movie = new Movie({
        title: req.body.title,
        genere: {
            _id:genere._id,
            name:genere.name,
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    await movie.save();
    res.send(movie);
});
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);   
    if(error) return res.status(400).send(error.details[0].message);

    const genere = await Genere.findById(req.body.genereId);
    if(!genere) return res.status(404).send('Invalid Genere');

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genere:{
            _id:genere._id,
            name:genere.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate},
    {new:true});
    if(!movie) return res.status(404).send('The movie was not fiund with the given id...');
    res.send(movie);
});
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('The customer was not fiund with the given id...');
    res.send(movie);
});

module.exports = router;