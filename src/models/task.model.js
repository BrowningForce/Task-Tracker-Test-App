module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    title: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
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
