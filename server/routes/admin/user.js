const express = require('express');
const router = express.Router();
const passport = require('../../config/strategies');
const userController = require('../../controller/user');
const upload = require('../../config/imageStorage');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.patch('/:id', upload.single('avatar'), userController.update);
router.delete('/:id', userController.delete);


module.exports = router;