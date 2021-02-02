const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.get(`/`,clientController.findAllClients);

module.exports = router;