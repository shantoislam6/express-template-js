const api = require('express').Router();
const cors = require('cors');

// allow all origin
api.use(cors());

// v1 users rest api endpoint
api.use('/users', require('./users/api.users'));

module.exports = api;
