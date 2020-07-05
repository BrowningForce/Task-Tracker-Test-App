module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      unique: true,
      type: Sequelize.STRING(100),
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  });

  return User;
};
