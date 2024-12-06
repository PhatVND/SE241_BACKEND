const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

function adminMiddleware(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    if (decoded.role === 'ADMIN') {
      next();
    }
    else return res.status(403).json({ message: 'Access denied: Admins only' });
  } catch (err) {
    res.status(401).json({ message: 'Token is expired or not valid' });
  }
}

module.exports = adminMiddleware;
