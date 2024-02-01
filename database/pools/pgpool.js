const { Pool } = require('pg');

const config = {
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  user: process.env.PDB_USERNAME,
  password: process.env.PDB_PASSWORD,
  database: process.env.PDB_D_DATABASE,
}

const pgpool = new Pool(config);

module.exports = pgpool;