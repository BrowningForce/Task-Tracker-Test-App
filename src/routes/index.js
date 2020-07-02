const express = require('express');
const passport = require('passport');
const tasks = require('./tasks');
const auth = require('./auth');
const users = require('./users');

const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/auth/login',
});

const routes = express.Router();

routes.get('/', requireAuth, (req, res) => res.redirect('/tasks'));
routes.use('/tasks', requireAuth, tasks);
routes.use('/auth', auth);
routes.use('/users', requireAuth, users);

module.exports = routes;
