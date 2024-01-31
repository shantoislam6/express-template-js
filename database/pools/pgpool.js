const { Pool } = require('pg');

const pgpool = new Pool({
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  username: process.env.PDB_USERNAME,
  password: process.env.PDB_PASSWORD,
  database: process.env.PDB_D_DATABASE,
});


module.exports = pgpool;