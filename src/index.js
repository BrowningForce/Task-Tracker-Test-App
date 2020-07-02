const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const db = require('./db');

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

db.query(
  `CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(100) UNIQUE NOT NULL, 
    description VARCHAR(100), 
    status VARCHAR(100),
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
// db.end();
const app = express();
// app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.json({
    message: 'hit slash route',
  });
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
