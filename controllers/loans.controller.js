const LoansModel = require('../models/Loan');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

// Added Checks to counter double entries (2/7/18)

function RequestLoan (req, res){
    var loanObject = {
        userId: req.body.userId,
        amount: req.body.amount,
        tenure: req.body.tenure,
        guarantorId: req.body.guarantorId
    };

    // check if guarantor id and user id is the same
    // both cant be the same, because a user cannot be his own guarantor

    if (loanObject.userId === loanObject.guarantorId) return res.status(403).json({'status': false, 
    'message': 'A user cannot be his own guarantor', payload: null});
    
    (new LoansModel(loanObject)).save((err, object) => {
        if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
        res.status(201).json([{'status': true, 'message': 'Success', payload: object}]);
    });

}

/* 
    Edited the 'viewLoan' function to be able to get one loan or multiple loans based on if an id was 
    passed or not
    (5/6/18)
*/

function ViewLoan (req, res) {
    let id = req.params.id;

    if (id === undefined){
        LoansModel.find((error, loan) => {
            if(error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(200).json([{'status': true, 'message': 'Success', payload: loan}]);
        });
    } else {
        LoansModel.findById(id,(error, loan) => {
            
            // check to see if loan exist or not
            if (!loan) return res.status(404).json({'status': false, 'message': 'Loan not found', payload: null})

            if(error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(200).json([{'status': true, 'message': 'Success', payload: loan}]);
        });
    }
}

/*
  Updated the 'guarantorApprove' function to be able to accept boolean values and then change
  the value in the loan accordingly
   (6/7/18)
*/

// Changed the query from "findByIdAndUpdate" to "findById" so as to enable checks
function GuarantorApprove (req, res){

    LoansModel.findById( req.params.id, (error, loan) => {

        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null}); 
        
        // Check if loan has been accepted, hence no changes should be made by the guarantor. (2/7/18)
        if (loan.isApproved) return res.status(403).json({'status': false, 
        'message': 'Loan has been accepted, Cannot change Guarantor\'s state ', payload: null});

        loanVal = req.body.approve;
        messages = {
            msgFalse : "Guarantor Disapproved",
            msgTrue : "Guarantor Approved"
        }
        msgToSend = "";

        // Double Entry Check (2/7/18)
        if (loanVal && loan.guarantorApproved) return res.status(304).json({'status': false, 
        'message': 'Guarantor Has Already Been Approved', payload: null});
        if (!loanVal && !loan.guarantorApproved) return res.status(304).json({'status': false, 
        'message': 'Guarantor Has Not Been Approved', payload: null}); 
       
        // Check for a truthy Entry and a falsy entry (2/7/18)
        if (loanVal) {
            loan.guarantorApproved = true;
            msgToSend = messages.msgTrue;
        } else if (!loanVal) {
            loan.guarantorApproved = false;
            msgToSend = messages.msgFalse;
        }
        
        loan.save((err, saved)=>{

            if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(202).json([{'status': true, 'message': msgToSend, payload: loan}]);
        });
        
    });

}

// Edited "AcceptLoan" query method from findByIdAndUpdate to findById because the former query was 
// changing the '.isApproved' to true even after checking and seeing that '.guarantorApproved' is false

function AcceptLoan (req, res){

    LoansModel.findById( req.params.id,(error, loan) => {
        
        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});

        // Added a 'guarantorApproved' check statement
        if(!loan.guarantorApproved) return res.status(403).json({'status': false, 'message': 'Loan Not Approved By Your Guarantor', payload: null});

        // Check for double entry (2/7/18)
        if(loan.isApproved) return res.status(304).json({'status': false, 'message': 'Loan Has Already Been Accepted', payload: null});
        
        loan.isApproved = true;

        // changed 'res' in line  67 to 'saved' because it was messing with the main 'res' on line 55
        loan.save((err, saved)=>{

            if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(202).json([{'status': true, 'message': 'Loan Accepted', payload: loan}]);
        });

    });

}

function RejectLoan(req, res){

    LoansModel.findById( req.params.id,(error, loan) => {
        
        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
        if(loan.isDisbursed) return res.status(403).json({'status': false, 'message': 'Loan Has been Disbursed', payload: null});

        // Check for double entry (2/7/18)
        if(!loan.isApproved) return res.status(400).json({'status': false, 'message': 'Loan Has Not Been Accepted', payload: null});
        
        loan.isApproved = false;
        loan.save((err, saved)=>{

            if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(202).json([{'status': true, 'message': 'Loan Rejected', payload: loan}]);
        });

    });
}

// Edited "LoanRepaid" function too, it was return a false value although it has changed its
// value to true
function LoanRepaid(req, res){

    LoansModel.findById( req.params.id, (error, loan) => {

        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
        if (loan.amountDisbursed !== loan.totalRepaidTillDate) return res.status(403).json({'status': false,
         'message': 'Loan Has Not Been Paid in Full', payload: null});

        if (!loan.isDisbursed) return res.status(403).json({'status': false,
        'message': 'Loan Has Not Been Disbursed', payload: null});

        // Check for double entry (2/7/18)
        if(loan.isRepaid) return res.status(400).json({'status': false, 'message': 'Loan Has Already Been Repaid', payload: null});

        loan.isRepaid = true;

        loan.save((err, saved) => {
            if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(202).json([{'status': true, 'message': 'Loan Repaid', payload: saved}]);
        });
        
    });
}

/* 
    Action : Updated the `DeleteLoan`, checked to be sure that the requested loan is not `null`
    Date : 30th June 2018
*/
function DeleteLoan(req, res){
    LoansModel.findById( req.params.id,(error, loan) => {
        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
        
        // check if the loan is not `null`
        // if its null that means requested loan to delete not found
        if(!loan) return res.status(404).json({'status':false,'message':'Loan not found','payload':loan});
        if(loan.isDisbursed) return res.status(403).json({'status': false, 'message': 'Loan Has been Disbursed', payload: null});

        LoansModel.deleteOne({_id:loan._id},(err)=>{
            if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(200).json([{'status': true, 'message': 'Loan Deleted'}]);
        }); 
    });
}

function DisburseLoan (req, res){

    LoansModel.findById( req.params.id,(error, loan) => {

        if (error) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
        if(!loan.isApproved) return res.status(403).json({'status': false, 'message': 'Loan Not Approved', payload: null});

        // Added a 'guarantorApproved' check statement
        if(!loan.guarantorApproved) return res.status(403).json({'status': false, 'message': 'Loan Not Approved By Your Guarantor', payload: null});
        
        // Check for double entry (4/7/18)
        if(loan.isDisbursed) return res.status(400).json({'status': false, 'message': 'Loan Has been disbursed', payload: null});
      

        loan.isDisbursed = true;
        loan.amountDisbursed = req.body.amountDisbursed || loan.amount;
        loan.amountDisbursedReason = req.body.amountDisbursedReason;
        loan.disbursementDate = Date.now();
        
        // changed 'res' in "loan.save" to 'saved' because it was messing with the main 'res' on "DisburseLoan"
        loan.save((err, saved)=>{
            if (err) return res.status(422).json({'status': false, 'message': 'An Error Occured', payload: null});
            res.status(200).json([{'status': true, 'message': 'Loan Disbursed', payload: loan}]);
        });
    });
}


module.exports = {
    RequestLoan,
    ViewLoan,
    GuarantorApprove,
    AcceptLoan,
    RejectLoan,
    LoanRepaid,
    DeleteLoan,
    DisburseLoan
}
