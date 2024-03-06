const express = require('express');
const userController = require('./userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);

module.exports = router;
