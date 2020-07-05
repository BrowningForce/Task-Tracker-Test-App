const users = require('../controllers/user.controller');

const findByUserId = (id) => {
  return users.findByUserId(id);
};

const verifyUser = async (email) => {
  try {
    const foundUser = await users.findByEmail(email);
    return foundUser;
  } catch (error) {
    return {
      message: 'Could not find user with the specified email',
      error: error.message,
    };
  }
};

module.exports = { findByUserId, verifyUser };
