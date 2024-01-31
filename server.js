const express = require('express');
const app = express();

// add configs
require('./configs/');


// logs HTTP requests
app.use(require('morgan')('dev'))

// use routes
app.use(require('./routers/routes'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
