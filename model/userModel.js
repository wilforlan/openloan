const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//mongoose schema obj
let userSchema = mongoose.Schema({
    firstname:{ 
        type: String,
        require: true,
        minlength: 4, 
        maxlength: 200
    },
    lastname: {
        type: String,
        require: true,
        minlength: 4, 
        maxlength: 200
    },
    username: {
        type: String,
        required: true,
        minlength: 4, 
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
       
    },
    password: {
        type: String,
        hide: true,
        minlength: 6, 
        required: true,

    },
    telephone: {
        type: String,
        required:true,
        maxlength:15
    },
    state_id: {
        type:Number,
        maxlength:11
        },
    country_id: {
        type:Number,
        maxlength:11
        },
    status_id:{
        type:String,
        enum:['active', 'inactive', 'deleted']
    },
    date: { 
        type: Date,
         default: Date.now
        },
    address:{
      type:String,
      required: true
    },
    user_roles_id:{
        type:String,
        },
});

module.exports = mongoose.model('user', userSchema)

