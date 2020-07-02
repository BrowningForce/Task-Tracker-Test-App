const db = require('../db');

const createUsersTable = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY, 
          email VARCHAR(100) UNIQUE NOT NULL, 
          first_name VARCHAR(100), 
          last_name VARCHAR(100), 
          password VARCHAR(100) NOT NULL,
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

module.exports = { createUsersTable };
