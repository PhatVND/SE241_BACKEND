const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const userMiddleware = require('../middlerware/userMiddleware');

// for render
router.get('/info', userController.getInfo);
router.post('/check/password', userController.checkPassword);
router.post('/check/role', userController.checkRole);
router.get('/logout', userController.logout);
router.get('/print/history', userMiddleware, userController.printHistory);
router.get('/print/buy', userMiddleware, userController.buyPage);


// for fetch
router.get('/get/info', userController.fetchInfo);

module.exports = router