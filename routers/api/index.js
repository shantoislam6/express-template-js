const api = require('express').Router();
const cors = require('cors');

// allow all origin
api.use(cors());

// v1 users rest api endpoint
api.use('/users', require('./users/api.users'));
api.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource or endpoint does not exist."
  });
});

module.exports = api;
