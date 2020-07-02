const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { createUsersTable } = require('./actions/createUsersTable');
const { createTasksTable } = require('./actions/createTasksTable');

createUsersTable();
createTasksTable();

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', require('./routes'));

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
