const db = require('../db');

const createUser = (firstName, lastName, email, password) => {
  const query = `
    INSERT INTO users
    (first_name, last_name, email, password, created_on)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  return db.one(query, [firstName, lastName, email, password, new Date()]);
};

module.exports = { createUser };
