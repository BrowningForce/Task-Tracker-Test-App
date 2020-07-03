const users = require('../controllers/user.controller');

const findByUserId = (id) => {
  return users.findByUserId(id);
};

const verifyUser = (email) => {
  return users.findByEmail(email);
};

module.exports = { findByUserId, verifyUser };
