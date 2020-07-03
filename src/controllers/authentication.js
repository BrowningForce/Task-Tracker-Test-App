const jwt = require('jwt-simple');
require('dotenv').config();
const bcrypt = require('bcrypt');
const users = require('./user.controller');
// const { createUser } = require('../actions/signUp');

const generateUserToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.user_id,
      iat: timestamp,
    },
    process.env.SECRET
  );
};

const signIn = (req, res, next) => {
  res.send({
    token: generateUserToken(req.user),
  });
};

const signUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const saltRounds = 12;

  if (!email || !password) {
    res.status(422).json({
      error: 'You must provide both email and password',
    });
    return;
  }

  if (!(/\S+@\S+\.\S+/.test(email))) {
    res.status(422).json({
      error: 'You must provide email address in the following format: "email@example.com"',
    });
    return;
  }

  bcrypt
    .hash(password, saltRounds)
    .then(async (hash) => {
      try {
        const newUser = await users.create({
          firstName,
          lastName,
          email,
          hash,
        });
        res.json({ token: generateUserToken(newUser) });
        console.log(newUser);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: 'Error saving user to database',
          errorMessage: error.message,
        });
      }
    })
    .catch((err) => next(err));
};

module.exports = { signIn, signUp };
