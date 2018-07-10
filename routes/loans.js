var express = require('express');
var router = express.Router();
const LoanController = require('../controllers/loans.controller');
var JWT_Verify = require('../middlewares/jwt');

router.use(JWT_Verify.verifyToken);
router.post('/request',LoanController.RequestLoan);
router.get('/:id', LoanController.ViewLoan);
router.get('/',LoanController.ViewLoan);

// Changed approve router from "get" to "put" (2/7/18)
router.put('/approve/:id',LoanController.GuarantorApprove);
router.get('/accept/:id', LoanController.AcceptLoan);
router.get('/reject/:id', LoanController.RejectLoan);
router.delete('/delete/:id', LoanController.DeleteLoan);
router.put('/disburse/:id', LoanController.DisburseLoan);
router.get('/repaid/:id', LoanController.LoanRepaid);
// router.post('/repay/:id', LoanController.LoanRepay);

module.exports = router;