const router = require('express').Router();

router.get('/login', (req, res) => {
  res.json({
    message: 'login route',
  });
});

module.exports = router;
