const { userValidationSchema } = require('../validations/userValidationSchema');
const {
  getAll,
  get,
  create,
  update,
  remove,
  getTotalUsersCount,
} = require('../models/model.users');

// Get all users in paginate mode
const getUsers = async (req, res) => {
  let users = [];
  let maxLimit = 50;
  let offset = parseInt(req.query['offset']);
  let limit = parseInt(req.query['limit']);

  // Validate offset and limit
  offset = isNaN(offset) || offset < 0 ? 0 : offset;
  limit = isNaN(limit) || limit < 1 || limit > maxLimit ? maxLimit : limit;

  try {
    // Fetch users with pagination directly from the database
    users = await getAll(limit, offset);
    const totalUsersCount = await getTotalUsersCount();
    res.json({
      success: true,
      pagination: {
        total: totalUsersCount,
        offset,
        limit,
      },
      size: users.rowCount,
      users: users.rows,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

// Get individual user
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch user by ID
    const user = await get(userId);

    if (user.rowCount > 0) {
      res.json({ success: true, user: user.rows[0] });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (err) {
    return;
  }
};

// Create new user
const createUser = async (req, res) => {
  const user = req.body;
  const result = await userValidationSchema.safeParseAsync(user);

  if (result?.error) {
    let errors = {};
    result.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({
      success: false,
      validation: false,
      errors: errors,
    });
    return;
  }

  try {
    const createdUser = await create(user);
    res.json({ success: true, user: createdUser.rows[0] });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// update existing user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateUserData = req.body;
  const result = await userValidationSchema.safeParseAsync(updateUserData);

  if (result?.error) {
    let errors = {};
    result.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({
      success: false,
      validation: false,
      errors: errors,
    });
    return;
  }
  try {
    const updatedUser = await update(userId, updateUserData);
    if (updatedUser.rowCount > 0) {
      res.json({ success: true, user: updatedUser.rows[0] });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Delete existing user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await remove(userId);
    if (deletedUser.rowCount > 0) {
      res.json({ success: true, user: deletedUser.rows[0] });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
