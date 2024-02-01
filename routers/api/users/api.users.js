const users = require('express').Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../../../controllers/controller.users');

// Users api routes
users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', createUser);
users.put('/:id', updateUser);
users.delete('/:id', deleteUser);

module.exports = users;