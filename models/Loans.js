const mongoose = require('mongoose');

let loanSchema = new mongoose.Schema({ 
    users_id: {
        type: int,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 11
    },
    guarantor_id: {
        type: int,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 11
    },
    date_accepted:{
        type: Date,
        required: true,
        trim: true
    },
    date_ended: {
        type: Date,
        required: true,
        trim: true
    },
    loan_duration: {
        type: int,
        required: true,
        minlength: 1,
        maxlength: 11
    },
    interest: {
        type: Number,
        required: true
    },
    amount_requested: {
        type: Number,
        required: true
    },
    payment_duration: {
        type: String,
        enum: ['lump', 'weekly', 'monthly'],
        required: true
    }
});

module.exports = mongoose.model('loans', loanSchema)