const db = require('../db');

const findByUserId = (id) => {
  const query = `
    SELECT *
    FROM USERS
    WHERE id=$1`;

  return db.oneOrNone(query, [id]);
};

const verifyUser = (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email=$1`;

  return db.oneOrNone(query, [email]);
};

module.exports = { findByUserId, verifyUser };
