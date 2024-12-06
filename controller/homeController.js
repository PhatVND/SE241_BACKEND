const UserRepository = require('../repositories/userRepository');
const { generateRefreshToken } = require('../helper/token');
const ms = require('ms');
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

//[GET] /
module.exports.homePage = (req, res) => {
    res.render("index");
}

//[POST] /login
module.exports.loginPage = async (req, res) => {
    try {
        let { email, password } = req.body;

        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Cant find account');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid password');

        const refreshToken = generateRefreshToken(user._id.toString(), user.role);
        user.refreshToken = refreshToken;
        await user.save();

        res
            .status(200)
            .cookie('refreshToken', refreshToken, {
                httpOnly: true, // Chỉ có thể truy cập từ server
                maxAge: ms(process.env.EXPIRE_REFRESH), // Thời gian sống của cookie
            })
            .json({ refreshToken: refreshToken, role: user.role });

    } catch (error) {
        const message =
            error.message === 'Cant find account'
                ? 'Tài khoản không tồn tại. Vui lòng kiểm tra email của bạn!'
                : error.message === 'Invalid password'
                    ? 'Mật khẩu không đúng. Vui lòng thử lại!'
                    : 'Có lỗi xảy ra, vui lòng thử lại sau.';

        // Respond with a user-friendly error message
        res.status(400).json({ message });
    }
}

module.exports.getToken = (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        console.log(token);
        if (!token)
            return res.status(401).json({ message: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
        res.status(200).json({ message: 'Token is valid' });

    } catch (err) {
        res.status(401).json({ message: 'Token is expired or not valid' });
    }
}