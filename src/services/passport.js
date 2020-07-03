const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { findByUserId, verifyUser } = require('../actions/signIn');
require('dotenv').config();

// Create local strategy

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  return verifyUser(email).then((validUser) => {
    bcrypt
      .compare(password, validUser.password)
      .then((validPassword) => {
        if (validPassword) {
          return done(null, validUser);
        }
        return done(null, false);
      })
      .catch((err) => done(err, false));
  });
});
// setup options for jwt strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

// create jwt strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  try {
    const foundUser = findByUserId(payload.sub);
    if (foundUser) {
      return done(null, foundUser);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
