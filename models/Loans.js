const mongoose = require('mongoose');

let loanSchema = new mongoose.Schema({
    user_id: {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 11
    },
    guarantor_id: {
        guarantor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guarantor'
        },
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 11
    },
    date_accepted:{
        type: Date,
        required: true
    },
    date_ended: {
        type: Date,
        required: true
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