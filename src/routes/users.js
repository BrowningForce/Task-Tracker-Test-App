const router = require('express').Router();
const db = require('../db');
const { findByUserId, verifyUser } = require('../actions/signIn');
const { getUserId } = require('../actions/getUserId');
const sql = require('../sql').users;

router.get('/', (req, res) => {
  res.redirect('/users/page/:page');
});

router.get('/page/:page', async (req, res) => {
  const { page } = req.params;
  const resultsPerPage = 10;
  const offset = (page - 1) * resultsPerPage;
  try {
    const users = await db.query(sql.search, [resultsPerPage, offset]);
    res.json({
      users,
      resultsPerPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await findByUserId(userId);

    res.json({
      message: 'User profile',
      user,
    });
  } catch (error) {
    res.json({
      message: 'User not found',
    });
    console.log(error);
  }
});

router.post('/:userId/edit', (req, res) => {

});

module.exports = router;
