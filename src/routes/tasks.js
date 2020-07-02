const router = require('express').Router();
const db = require('../db');
const { createTask } = require('../actions/createTask');
const { getUserId } = require('../actions/getUserId');

router.get('/', async (req, res) => {
  const userId = getUserId(req.headers.authorization);
  try {
    const query = `
    SELECT * FROM tasks
    WHERE assignee=$1`;

    const tasks = await db.query(query, [userId]);
    res.json({
      message: 'tasks route',
      tasks,
    });
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  const author = getUserId(req.headers.authorization);
  try {
    const task = await createTask(title, description, author);
    res.json({
      message: 'task created',
      task,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
