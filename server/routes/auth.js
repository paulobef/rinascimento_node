const express = require('express');
const router = express.Router();
userController = require('../controller/user');

router.post('/register', userController.create);
router.post('/login', userController.authenticate);

router.post('/password-reset', userController.resetPassword);
router.post('/new-password', userController.newPassword);


module.exports = router;