var express = require('express');
var router = express.Router();
const LoanController = require('../controllers/loan.controller');
// const UserValidator = require('../validators/loan.validator');
var JWT_Verify = require('../middlewares/jwt');

router.use(JWT_Verify.verifyToken);
router.post('/request',LoanController.RequestLoan);
router.get('/',LoanController.ViewLoans);
router.get('/accept/:id', LoanController.AcceptLoan);
router.get('/reject/:id', LoanController.RejectLoan);
router.delete('/delete/:id', LoanController.DeleteLoan);
router.put('/disburse/:id', LoanController.DisburseLoan);
router.get('/repay/:id', LoanController.LoanRepaid);

module.exports = router;
