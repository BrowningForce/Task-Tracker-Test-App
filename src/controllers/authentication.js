const jwt = require('jwt-simple');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { createUser } = require('../actions/signUp');

const generateUserToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.user_id,
      iat: timestamp,
    },
    process.env.SECRET,
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
    res.status(422).send({
      error: 'You must provide both email and password',
    });
  }

  bcrypt
    .hash(password, saltRounds)
    .then(async (hash) => {
      try {
        const newUser = await createUser(firstName, lastName, email, hash);
        res.json({ token: generateUserToken(newUser) });
        console.log(newUser);
      } catch (error) {
        console.log(error);
        res.json({ error: 'Error saving user to database' });
      }
    })
    .catch((err) => next(err));
};

module.exports = { signIn, signUp };
