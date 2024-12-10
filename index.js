const error = require('./middleware/error');
const config = require('config');
const auths = require('./routes/auths')
const generes = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const returns = require('./routes/returns');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/prod')(app);

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/againproject')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connected to MongoDB'))

app.use(express.json());
app.use('/api/generes', generes);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auths', auths);
app.use('/api/returns', returns);

//Now we have a single place to handle errors
app.use(error);

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}....`));

module.exports = server;