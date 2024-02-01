const express = require('express');
const app = express();

// add configs
require('./configs/');

// parse json body
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// logs HTTP requests
app.use(require('morgan')('dev'));

// use routes
app.use(require('./routers/routes'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
