const router = require('express').Router();
const tasks = require('../controllers/task.controller');

router.get('/', tasks.findAll);

router.post('/add', tasks.create);

router.get('/:taskId', tasks.findOne);

router.put('/:taskId', tasks.update);

router.delete('/:taskId', tasks.delete);

module.exports = router;
