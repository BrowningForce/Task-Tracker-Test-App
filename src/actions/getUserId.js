const jwt = require('jsonwebtoken');

const getUserId = (userToken) => {
  const token = userToken.split(' ');
  const decoded = jwt.verify(token[1], process.env.SECRET);

  return decoded.sub.toString();
};

module.exports = { getUserId };
