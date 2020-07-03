module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      allowNull: false,
      type: Sequelize.STRING(25),
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING(25),
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(100),
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  });

  return User;
};
