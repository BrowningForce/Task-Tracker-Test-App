const db = require('../models');

const User = db.users;
const { getUserId } = require('../actions/getUserId');

// Create and Save a new User
exports.create = async ({
  firstName,
  lastName,
  email,
  hash,
}) => {
  // Create a User
  const user = {
    first_name: firstName,
    last_name: lastName,
    email,
    password: hash,
  };

  // Save User in the database
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw new Error(error.message || 'Failed to create user');
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const { page = 1 } = req.query;
  const resultsPerPage = 10;
  const offset = (page - 1) * resultsPerPage;

  User.findAll({
    attributes: [
      'user_id',
      'first_name',
      'last_name',
      'email',
    ],
    limit: resultsPerPage,
    offset,
  })
    .then((users) => {
      res.json({
        users,
        resultsPerPage,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Could not retrieve users',
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.userId;

  User.findByPk(id, {
    attributes: [
      'first_name',
      'last_name',
      'email',
    ],
  })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Could not retrieve the user',
      });
    });
};

exports.findByUserId = (id) => {
  return User.findByPk(id)
    .then((user) => user)
    .catch((err) => err.message);
};

exports.findByEmail = (email) => {
  return User.findOne({
    where: {
      email,
    },
  })
    .then((user) => user)
    .catch((err) => err.message);
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.userId;
  const currentUserId = getUserId(req.headers.authorization);

  if (currentUserId === id) {
    User.update(req.body, {
      returning: true,
      where: { user_id: id },
    })
      .then((updatedUser) => {
        res.json({
          updatedUser,
          message: 'User was updated successfully.',
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error updating User with id ${id}`,
          error: err.message,
        });
      });
  } else {
    res.status(401).json({
      error: 'You do not have permission to do that',
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.userId;
  const currentUserId = getUserId(req.headers.authorization);

  if (currentUserId === id) {
    User.destroy({
      where: { user_id: id },
    })
      .then(() => {
        res.json({
          message: 'User was deleted successfully!',
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not delete User with id ${id}`,
          error: err.message,
        });
      });
  } else {
    res.status(401).json({
      error: 'You do not have permission to do that',
    });
  }
};
