const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//mongoose schema obj
let userSchema = mongoose.Schema({
    first_name:{ 
        type: String,
        require: true,
        minlength: 4, 
        maxlength: 200
    },
    last_name: {
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
        required: true,
       
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
        type: ObjectId,
        maxlength:11
        },
    country_id: {
        type: ObjectId,
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
        type:ObjectId,
        },
});

module.exports = mongoose.model('user', userSchema)

