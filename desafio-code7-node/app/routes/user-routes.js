const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.get(`/`,userController.findAllUsers);

module.exports = router;