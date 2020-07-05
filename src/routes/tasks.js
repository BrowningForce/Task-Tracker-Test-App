const router = require('express').Router();
const tasks = require('../controllers/task.controller');

/**
 * @swagger
 *
 */
router.get('/', async (req, res) => {
  if (req.query.status) {
    try {
      const taskList = await tasks.findByStatus(req.query.status);

      res.json({
        tasks: taskList,
      });
    } catch (error) {
      res(500).json({
        message: 'Error fetching task list',
        error: error.message,
      });
    }
  } else if (req.query.orderByUserCreatedDate) {
    try {
      const taskList = await tasks.orderByUserCreationDate(
        req.query.orderByUserCreatedDate,
      );

      res.json({
        tasks: taskList,
      });
    } catch (error) {
      res(500).json({
        message: 'Error fetching task list',
        error: error.message,
      });
    }
  } else {
    try {
      const taskList = await tasks.findAll();

      res.json({
        tasks: taskList,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching task list',
        error: error.message,
      });
    }
  }
});

router.post('/add', tasks.create);

router.get('/:taskId', tasks.findOne);

router.put('/:taskId', tasks.update);

router.delete('/:taskId', tasks.delete);

module.exports = router;
