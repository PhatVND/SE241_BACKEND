const UserRepository = require('../repositories/userRepository');
const printHistoryRepository = require('../repositories/printHistoryRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
require('dotenv').config('./.env');


//[GET] /user/info
module.exports.getInfo = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: 'You are logged out' });

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const user = await UserRepository.findById(decoded.id);
    if (!user) throw new Error('Cant find user');

    res.render("user/user_info", {
        user: user
    });
}

//[GET] /user/check/password
module.exports.checkPassword = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: 'You are logged out' });

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const user = await UserRepository.findById(decoded.id);
    if (!user) throw new Error('Cant find user');

    bcrypt.compare(req.body.currentPassword, user.password, async (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            user.password = req.body.newPassword;
            await user.save();
            res.status(200).json({ message: 'Đổi mật khẩu thành công' });
        } else {
            res.status(400).json({ message: 'Không đúng mật khẩu' });
        }
    });
}

//[GET] user/logout
module.exports.logout = (req, res, next) => {
    res.clearCookie('refreshToken');
    res.redirect('/');
};



module.exports.fetchInfo = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: 'You are logged out' });

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const user = await UserRepository.findById(decoded.id);
    if (!user) throw new Error('Cant find user');

    return user;
}


module.exports.checkRole = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: 'You are logged out' });

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const role = decoded.role;
    console.log(role);
    res.status(200).json({ role: role });
}



// for render
module.exports.printHistory = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: 'You are logged out' });

    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH);
    const id = decoded.id;

    const user = await UserRepository.findById(id);
    const email = user.email;

    const history = await printHistoryRepository.findByEmailUser(email);
    res.render("user/print-history", { historys: history });
}


module.exports.buyPage = async (req, res) => {
    res.render("user/buy_page");
}