const { getAll, get, create, update, remove } = getModel('users');

const getUsers = (req, res)=>{
  res.send(getAll());
}
const getUser = (req, res)=>{
  res.send(get());
}
const createUser = (req, res)=>{
  res.send(create());
}
const updateUser = (req, res)=>{
  res.send(update());
}

const deleteUser = (req, res)=>{
  res.send(remove());
}

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser};