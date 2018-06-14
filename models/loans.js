const MONGOOSE = require('mongoose');

let user = MONGOOSE.model('loan', {
    id :{
        type: int,
        unique: true,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 11
    }, 
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
        type: Enumerator,
        required: true
    }
});

module.exports = {user};