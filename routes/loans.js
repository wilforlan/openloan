var express = require('express');
var router = express.Router();
const LoanController = require('../controllers/loans.controller');
var JWT_Verify = require('../middlewares/jwt');

router.use(JWT_Verify.verifyToken);
router.post('/request',LoanController.RequestLoan);
router.get('/:id', LoanController.ViewLoan);
router.get('/',LoanController.ViewLoans);
router.get('/approve/:id',LoanController.GuarantorApprove);
router.get('/accept/:id', LoanController.AcceptLoan);
router.get('/reject/:id', LoanController.RejectLoan);
router.delete('/delete/:id', LoanController.DeleteLoan);
router.put('/disburse/:id', LoanController.DisburseLoan);
router.get('/repaid/:id', LoanController.LoanRepaid);
router.post('/repay/:id', LoanController.LoanRepay);

module.exports = router;