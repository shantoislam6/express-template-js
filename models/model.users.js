const pgpool = require('../database/pools/pgpool');

const getAll = async (limit, offset) => {
  const query =
    'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
  const res = await pgpool.query(query, [limit, offset]);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

const getTotalUsersCount = async () => {
  const result = await pgpool.query('SELECT COUNT(*) FROM users');
  const totalCount = parseInt(result.rows[0].count);
  return totalCount;
};

const get = async (userid) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const res = await pgpool.query(query, [parseInt(userid)]);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const res = await pgpool.query(query, [email]);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

const create = async (user) => {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [user.name, user.email];
  const res = await pgpool.query(query, values);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

const update = async (userid, userData) => {
  const query =
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
  const values = [userData.name, userData.email, parseInt(userid)];
  const res = await pgpool.query(query, values);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

const remove = async (userid) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [parseInt(userid)];
  const res = await pgpool.query(query, values);
  return {
    rowCount: res.rowCount,
    rows: res.rows,
  };
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  getTotalUsersCount,
  findUserByEmail,
};
