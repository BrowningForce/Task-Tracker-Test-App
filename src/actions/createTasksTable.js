const db = require('../db');

const createTasksTable = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY, 
      title VARCHAR(100) UNIQUE NOT NULL, 
      description VARCHAR(100),
      author VARCHAR(100) NOT NULL,
      assignee VARCHAR(100) NOT NULL,
      status status,
      created_on DATE NOT NULL
      )`,
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    },
  );
};

module.exports = { createTasksTable };
