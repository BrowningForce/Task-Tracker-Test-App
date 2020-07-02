const db = require('../db');
const sql = require('../sql').users;

const createUser = (firstName, lastName, email, password) => {
  const createdOn = new Date();
  // const query = `
  //   INSERT INTO users
  //   (first_name, last_name, email, password, created_on)
  //   VALUES ($1, $2, $3, $4, $5)
  //   RETURNING *`;

  return db.one(sql.add, [firstName, lastName, email, password, createdOn]);
};

module.exports = { createUser };
