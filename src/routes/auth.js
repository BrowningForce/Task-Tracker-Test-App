const router = require('express').Router();
const passport = require('passport');
const Authentication = require('../controllers/authentication');

const requireSignIn = passport.authenticate('local', { session: false });

router.get('/signup', (req, res) => {
  res.json({
    message: 'signup route',
  });
});

router.post('/signup', Authentication.signUp);

router.get('/login', (req, res) => {
  res.json({
    message: 'login route',
  });
});

router.post('/login', requireSignIn, Authentication.signIn);

module.exports = router;
