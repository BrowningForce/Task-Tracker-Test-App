const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json({
      message: 'users route',
      tasks: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
