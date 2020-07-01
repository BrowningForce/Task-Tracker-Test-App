const db = require('../../db');

const createUser = (firstName, lastName, email, password) => {
  const query = `
    INSERT INTO users
    (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

  return db.once(query, [firstName, lastName, email, password]);
};

module.exports = { createUser };
