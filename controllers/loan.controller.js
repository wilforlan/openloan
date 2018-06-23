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
        (new LoansModel(loanObject)).save((err, object) => {
            if (err) {
                res.json({'status': false, 'message': 'An Error Occured', payload: null})
            } else {
                res.json({'status': true, 'message': 'Success', payload: object});
            }
        });
}

function ViewLoans (req, res){
    LoansModel.find((error, loan) => {
            if (error) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            }
            res.json({'status': true, 'message': 'Success', payload: loan})
        });

}
function AcceptLoan (req, res){
    LoansModel.findByIdAndUpdate( req.params.id,{isApproved:true}, (error, loan) => {
            if (error) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            };
            res.json({'status': true, 'message': 'Loan Accepted', payload: loan})
        });

}
function RejectLoan(req, res){
    LoansModel.findById( req.params.id,(error, loan) => {
        if (error) {
            return res.json({'status': false, 'message': 'An Error Occured', payload: null})
        };
        if(loan.isDisbursed){
            return res.json({'status': false, 'message': 'Loan Has been Disbursed', payload: null})
        }
        loan.isApproved = false;
        loan.save((err,res)=>{
            if (err) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            };
            res.json({'status': true, 'message': 'Loan Rejected', payload: loan})
        })
        
    });

}
function LoanRepaid(req, res){
    LoansModel.findByIdAndUpdate( req.params.id,{isRepaid:true}, (error, loan) => {
            if (error) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            };
            res.json({'status': true, 'message': 'Loan Accepted', payload: loan})
        });
}
function DeleteLoan(){
    LoansModel.findById( req.params.id,(error, loan) => {
        if (error) {
            return res.json({'status': false, 'message': 'An Error Occured', payload: null})
        };
        if(loan.isDisbursed){
            return res.json({'status': false, 'message': 'Loan Has been Disbursed', payload: null})
        }
        LoansModel.deleteOne({_id:loan._id},(err)=>{
            if (err) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            };
            res.status(202).json({'status': true, 'message': 'Loan Deleted'})
        })
        
    });
}
function DisburseLoan (req, res){

    LoansModel.findById( req.params.id,(error, loan) => {
            if (error) {
                return res.json({'status': false, 'message': 'An Error Occured', payload: null})
            };
            if(!loan.isApproved){
                return res.json({'status': false, 'message': 'Loan Not Approved', payload: null})
            }
            
            loan.isDisbursed = true;
            loan.amountDisbursed = req.body.amount || loan.amount;
            loan.amountDisbursedReason = req.body.amountDisbursedReason;
            loan.disbursementDate = Date.now();
            loan.save((err,res)=>{
                if (err) {
                    return res.json({'status': false, 'message': 'An Error Occured', payload: null})
                };
                res.json({'status': true, 'message': 'Loan Disbursed', payload: loan})
            })
            
        });
}

// function


module.exports = {
    RequestLoan,
    ViewLoans,
    AcceptLoan,
    RejectLoan,
    LoanRepaid,
    DeleteLoan,
    DisburseLoan
}
