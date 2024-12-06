// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

module.exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is expired or not valid' });
    }
}