const express = require('express');
const passport = require('passport');
const tasks = require('./tasks');
const auth = require('./auth');

const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const routes = express.Router();

routes.get('/', requireAuth, (req, res) => res.redirect('/tasks'));
routes.use('/tasks', tasks);
routes.use('/', auth);

module.exports = routes;
