const routes = require('express').Router();

routes.use('/', require('./base'));
routes.use('/api', require('./api'));

module.exports = routes;
