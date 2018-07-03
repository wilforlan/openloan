var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanRepaymentSchema = new Schema({
    loanId:  { 
      type: Schema.ObjectId, 
      ref: 'Loans', 
      required: true
    },
    amount: { 
        type: Number, 
        required: true
    },
    notes: String,
},{
    collection: 'loan_repayments',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
});

const LoanRepayment = mongoose.model('LoanRepayment', loanRepaymentSchema);
module.exports = LoanRepayment;