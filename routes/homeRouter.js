const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController')

router.post('/login', homeController.loginPage);
router.get('/getToken', homeController.getToken);
router.get('/', homeController.homePage);

module.exports = router