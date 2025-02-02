 const { validate, Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers);
});
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('The customer was not fiund with the given id...');
    res.send(customer);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
    });
    await customer.save();
    res.send(customer);
});
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name}, {phone:req.body.phone});
    if(!customer) return res.status(404).send('The customer was not fiund with the given id...');
    
    res.send(customer);
});
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send('The customer was not fiund with the given id...');
    res.send(customer);
});
module.exports = router;