const db = require('../models');

const Task = db.tasks;
const { getUserId } = require('../actions/getUserId');

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).json({
      message: 'You need to provide a title!',
    });
    return;
  }

  // Create a Task
  const userId = getUserId(req.headers.authorization);
  const task = {
    title: req.body.title,
    description: req.body.description,
    author: userId,
    assignee: userId,
    status: 'View',
  };

  // Save Task in the database
  Task.create(task)
    .then((newTask) => {
      res.json(newTask);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Task.',
      });
    });
};

// Retrieve all Task from the database.
exports.findAll = (req, res) => {
  Task.findAll({
    where: {},
  })
    .then((tasks) => {
      res.json({
        tasks,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: err.message || 'Could not retrieve tasks',
      })
    );
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const { taskId } = req.params;

  Task.findByPk(taskId)
    .then((task) => {
      res.json({ task });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Could not retrieve the task',
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const task = await Task.findByPk(req.params.taskId);
  const authorId = task.author;
  const currentUserId = getUserId(req.headers.authorization);

  if (currentUserId === authorId) {
    Task.update(req.body, {
      returning: true,
      where: { id: req.params.taskId },
    })
      .then(() => {
        res.json({
          message: 'Task was updated successfully.',
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error updating Task with id ${req.params.taskId}`,
        });
      });
  } else {
    res.status(401).json({
      error: 'You do not have permission to do that',
    });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  const task = await Task.findByPk(req.params.taskId);
  const authorId = task.author;
  const currentUserId = getUserId(req.headers.authorization);

  if (currentUserId === authorId) {
    Task.destroy({
      where: { id: req.params.taskId },
    })
      .then(() => {
        res.redirect('/api/tasks');
      })
      .catch((err) => {
        res.status(500).json({
          message: `Could not delete User with id ${req.params.taskId}`,
        });
      });
  } else {
    res.status(401).json({
      error: 'You do not have permission to do that',
    });
  }
};
