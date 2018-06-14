const mongoose = require('mongoose');

const Schema = mongoose.Schema({

    id:{
        type: Number,
        minlength: 1,
        maxlength: 11
    },

    loan_id:{
        type: Number,
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
        type: Array,
        required: true 

    }

})


module.exports = mongoose.model('history', Schema);