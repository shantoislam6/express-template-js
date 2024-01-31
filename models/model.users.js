const pgpool = require('../database/pools/pgpool');

const getAll = () => {
  return 'getAll';
};
const get = () => {
  return 'get';
};
const create = () => {
  return 'create';
};
const update = () => {
  return 'update';
};

const remove = () => {
  return 'remove';
};

module.exports = { getAll, get, create, update, remove };
