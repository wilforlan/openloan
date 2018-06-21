var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanSchema = new Schema({
    userId:  { 
      type: Schema.ObjectId, 
      ref: 'Users', 
      required: true
    },
    amount: {
        type: Number, 
        default: 0 , 
        required: true
    },
    tenure: {
        type: Number, 
        default: 12, 
        required: true
    },
    guarantorId: { 
        type: Schema.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    guarantorApproved: {
        type: Boolean, 
        default: false
    },
    amountDisbursed: { 
        type: Number, 
        default: 0 
    },
    amountDisbursedReason: {
        type: String 
    },
    disbursementDate: { 
        type: Date 
    },
    isApplication: {
        type: Boolean, 
        default: true
    },
    isApproved: {
        type: Boolean, 
        default: false
    },
    isDisbursed: {
        type: Boolean, 
        default: false
    },
    isRepaid: {
        type: Boolean, 
        default: false
    },
    totalRepaidTillDate: {
        type: Number, 
        default: 0
    }
},{
    collection: 'loans',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
});

const Loans = mongoose.model('Loan', loanSchema);
module.exports = Loans;