const pgp = require('pg-promise')();
require('dotenv').config();

const connection = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'taskTracker',
};

const db = pgp(connection);

module.exports = db;
