const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');

db.sequelize.sync().then(() => console.log('DB connected.'));
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and resync db.');
// });

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.redirect('/api');
});
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
