const path = require('path');

// .env
require('dotenv').config();

// global contants
global.PORT = process.env.PORT ?? 8080;
global.app_ = process.cwd();


