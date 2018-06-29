const LoansModel = require('../models/Loan');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

function RequestLoan (req, res){
    var loanObject = {
        userId: req.body.userId,
        amount: req.body.amount,
        tenure: req.body.tenure,
        guarantorId: req.body.guarantorId
    };

    // check if guarantor id and user id is the same
    // both cant be the same, because a user cannot be his own guarantor

    if (loanObject.userId === loanObject.guarantorId) return res.json({'status': false, 
    'message': 'A user cannot be his own guarantor', payload: null});

    (new LoansModel(loanObject)).save((err, object) => {
        
        if (err) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
        res.json({'status': true, 'message': 'Success', payload: object});
    });

}

// Added "ViewLoan" incase one needs to view a particular loan

function ViewLoan (req, res) {

    LoansModel.findById(req.params.id,(error, loan) => {
        
        if(error) return res.join({'status': false, 'message': 'An Error Occured', payload: null});
        res.json({'status': true, 'message': 'Success', payload: loan});
    });
}

function ViewLoans (req, res){

    LoansModel.find((error, loan) => {

        if(error) return res.join({'status': false, 'message': 'An Error Occured', payload: null});
        res.json({'status': true, 'message': 'Success', payload: loan});

    });

}

// Added function "GuarantorApprove" to update the field where the guarantors approves or 
// disapproves a loan

function GuarantorApprove (req, res){

    LoansModel.findByIdAndUpdate( req.params.id,{guarantorApproved:true}, (error, loan) => {
        
        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});        
        loan.guarantorApproved = true;
        res.json({'status': true, 'message': 'Guarantor Approved', payload: loan});
        
    });

}

// Edited "AcceptLoan" query method from findByIdAndUpdate to findById because the former query was 
// changing the '.isApproved' to true even after checking and seeing that '.guarantorApproved' is false

function AcceptLoan (req, res){

    LoansModel.findById( req.params.id,(error, loan) => {
        
        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});

        // Added a 'guarantorApproved' check statement
        if(!loan.guarantorApproved) return res.json({'status': false, 'message': 'Loan Not Approved By Your Guarantor', payload: null});
        
        loan.isApproved = true;

        // changed 'res' in line  67 to 'saved' because it was messing with the main 'res' on line 55
        loan.save((err, saved)=>{

            if (err) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
            res.json({'status': true, 'message': 'Loan Accepted', payload: loan});
        });

    });

}

function RejectLoan(req, res){

    LoansModel.findById( req.params.id,(error, loan) => {
        
        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
        if(loan.isDisbursed) return res.json({'status': false, 'message': 'Loan Has been Disbursed', payload: null});
        
        loan.isApproved = false;
        loan.save((err, saved)=>{

            if (err) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
            res.json({'status': true, 'message': 'Loan Rejected', payload: loan});
        });

    });
}

// Edited "LoanRepaid" function too, it was return a false value although it has changed its
// value to true
function LoanRepaid(req, res){

    LoansModel.findById( req.params.id, (error, loan) => {

        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
        if (loan.isDisbursed !== loan.totalRepaidTillDate) return res.json({'status': false, 'message': 'Loan Has Not Been Paid in Full', payload: null});
        loan.isRepaid = true

        loan.save((err, saved) => {
            if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
            res.json({'status': true, 'message': 'Loan Repaid', payload: saved});
        });
        
    });
}

// Added "LoanRepay" function to update the field loanRepaidTillDate but this needs heavy refactoring
// function LoanRepay (req, res) {
//     LoansModel.findById( req.params.id, (error, loan) => {

//         messages = {
//             payAccepted : "Your payment has been accepted, Thanks.",
//             payOver: "You over paid, Please repay with the correct sum, Thanks.",
//             payComplete: "Congratulation, You Are Through With Your Payment."
//         }

//         msgToSend = "";

//         let total = loan.amount;
//         let amount = req.body.amount;
//         let accm = loan.totalRepaidTillDate + amount;
//         let cmplt = req.body.amount + loan.totalRepaidTillDate;
//         let balance = total - loan.totalRepaidTillDate;
//         let overPay = "";


//         if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
//         if (total === loan.totalRepaidTillDate) return res.json({'status': false, 'message': 'Loan Has Been Paid in full', payload: loan});

//         if (amount< total && accm < total){
//             msgToSend = messages.payAccepted;
//         } else if (cmplt === total) {
//             msgToSend = messages.payComplete;
//         } else if (accm > total) {
//             msgToSend = messages.payOver;
//             return res.json({'status': false, 'message': msgToSend, 'balance': balance, payload: null})
//         }

//         loan.totalRepaidTillDate += amount;

//         loan.save((err, saved) => {
//             res.json({'status': true, 'message': msgToSend, payload: loan});
//         })
        
//     });
// }

function DeleteLoan(req, res){

    LoansModel.findById( req.params.id,(error, loan) => {

        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
        if(loan.isDisbursed) return res.json({'status': false, 'message': 'Loan Has been Disbursed', payload: null});

        LoansModel.deleteOne({_id:loan._id},(err)=>{
            if (err) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(202).json({'status': true, 'message': 'Loan Deleted'})
        });
    });
}

function DisburseLoan (req, res){

    LoansModel.findById( req.params.id,(error, loan) => {

        if (error) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
        if(!loan.isApproved) return res.json({'status': false, 'message': 'Loan Not Approved', payload: null});

        // Added a 'guarantorApproved' check statement
        if(!loan.guarantorApproved) return res.json({'status': false, 'message': 'Loan Not Approved By Your Guarantor', payload: null});
        
        if(loan.isDisbursed) return res.json({'status': false, 'message': 'Loan Has been disbursed', payload: null});
      

        loan.isDisbursed = true;
        loan.amountDisbursed = req.body.amountDisbursed || loan.amount;
        loan.amountDisbursedReason = req.body.amountDisbursedReason;
        loan.disbursementDate = Date.now();
        
        // changed 'res' in line  67 to 'saved' because it was messing with the main 'res' on line 55
        loan.save((err, saved)=>{
            if (err) return res.json({'status': false, 'message': 'An Error Occured', payload: null});
            res.json({'status': true, 'message': 'Loan Disbursed', payload: loan});
        });
    });
}


module.exports = {
    RequestLoan,
    ViewLoan,
    ViewLoans,
    GuarantorApprove,
    AcceptLoan,
    RejectLoan,
    LoanRepaid,
    // LoanRepay,
    DeleteLoan,
    DisburseLoan
}
