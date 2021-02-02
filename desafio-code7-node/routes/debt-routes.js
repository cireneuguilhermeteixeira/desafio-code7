const express = require('express');
const router = express.Router();
const debtController = require('../controllers/DebtController');
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.post(`/`,debtController.createDebt);
router.get(`/client/:id`,debtController.findAllDebtsFromClient);
router.get(`/:id`,debtController.findDebtById);
router.put(`/`,debtController.updateDebt);
router.delete(`/:id`,debtController.deleteDebt);

module.exports = router;