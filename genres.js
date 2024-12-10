const {validate, Genere} = require('../models/genre');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async'); 
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router()
    



router.get('/', asyncMiddleware(async (req, res) => {
    const generes = await Genere.find()
    res.send(generes);
}));
router.get('/:id', validateObjectId, async (req, res) => {
    
    const genere = await Genere.findById(req.params.id);
    if(!genere) return res.status(404).send('The genere was not fiund with the given id...');
    res.send(genere);
});
router.post('/', auth,  async (req, res) => {

    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genere = new Genere ({
        name: req.body.name
    })
    await genere.save()
    res.send(genere);
});
router.put('/:id',validateObjectId, async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genere = await Genere.findByIdAndUpdate(req.params.id,{name:req.body.name}, {new:true});
    if(!genere) return res.status(404).send('The genere was not fiund with the given id...');

    res.send(genere); 
});

router.delete('/:id', [auth, admin],  async (req, res) => {
    const genere = await Genere.findByIdAndDelete(req.params.id);
    if(!genere) return res.status(404).send('The genere was not fiund with the given id...');
    res.send(genere);
});

module.exports = router;



// Middleware function
// Middleware function ek aisi function hai jo req, res, aur next ko handle karta hai. Jab client se koi request aati hai, toh middleware us request ko process karta hai aur response bhejne se pehle kuch kaam (operations) karta hai.
// Middleware Ki Khasiyat
// Request aur Response Ke Darmiyan Hoti Hai: Middleware request aur response ke beech ka bridge hoti hai.
// Access to Request/Response Objects:
// Middleware ko request aur response objects modify karne ka access hota hai.
// Example: Authentication check, logging, etc.
// next() Function:
// Agar middleware ka kaam khatam ho gaya hai, toh next() call hoti hai jo control ko next middleware ya route handler ko pass kar deti hai.
// Middleware Ka Use
// Middleware ka use alag-alag kaam ke liye hota hai, jaise:

// Authentication: User ki identity verify karna.
// Logging: Console pe ya kisi file me request ki details log karna.
// Parsing: Request body ko JSON ya URL-encoded format me convert karna.
// Error Handling: Agar request processing me koi error ho, toh usko handle karna.