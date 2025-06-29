const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (roles = []) => {
  return (req, res, next) => {
       // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      if (roles.length && !roles.includes(user.role)) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  };
};

module.exports = { authenticateToken };
