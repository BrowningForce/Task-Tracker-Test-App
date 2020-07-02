const db = require('../db');

const createTask = async (title, description, author) => {
  const status = 'View';
  const createdOn = new Date();
  const query = `
    INSERT INTO tasks
    (title, description, author, assignee, status, created_on)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  return db.one(query, [title, description, author, author, status, createdOn]);
};

module.exports = { createTask };
