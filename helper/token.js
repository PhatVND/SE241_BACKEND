// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

module.exports.generateRefreshToken = (userId, role) => {
    let payload = { id: userId, role: role };
    return jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
        expiresIn: process.env.EXPIRE_REFRESH,
    });
}
