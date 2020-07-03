const router = require('express').Router();
const users = require('../controllers/user.controller');

router.get('/', (req, res) => {
  res.redirect('page/:page');
});

router.get('/page/:page', users.findAll);

router.get('/:userId', users.findOne);

router.put('/:userId', users.update);

router.delete('/:userId', users.delete);

module.exports = router;
