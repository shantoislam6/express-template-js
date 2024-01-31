const users = require('express').Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = getController('users');

// Users api routes
users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', createUser);
users.put('/', updateUser);
users.delete('/', deleteUser);

module.exports = users;