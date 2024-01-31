const base = require('express').Router();

base.all('/', (req, res)=>{
  res.send('Express template');
})

module.exports = base;
