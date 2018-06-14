const mongoose = require('mongoose');

const PaymentHistorySchema = mongoose.Schema({

    loan_id:{
        type: mongoose.Schema.Types.ObjectId,
        minlength: 1,
        maxlength: 11,
        required: true
    },

    amount_paid: {
        type: Number,
        required: true
    },

    balance: {
        type: Number,
        required: true
    },

    payment_date:{
        type: Date,
        default: Date.now()
    },

    loan_status:{
        type: Enumeration,
        required: true 
    }

})


module.exports = mongoose.model('PaymentHistory', PaymentHistorySchema);