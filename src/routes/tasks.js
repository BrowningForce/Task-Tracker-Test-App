const router = require('express').Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const tasks = await db.query('SELECT * FROM tasks');
    res.json({
      message: 'tasks route',
      tasks: tasks.rows,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/add', async (req, res) => {

});

module.exports = router;
