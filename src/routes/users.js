const router = require('express').Router();
const db = require('../db');
const { findByUserId, verifyUser } = require('../actions/signIn');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT first_name, last_name, email FROM users');
    res.json({
      message: 'users route',
      users: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
