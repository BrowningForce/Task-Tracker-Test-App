module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    author: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    assignee: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('View', 'In Progress', 'Done'),
    },
  });

  return Task;
};
