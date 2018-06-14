const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//mongoose schema obj
let guarantorSchema = mongoose.Schema({
    name:{ 
        type: String,
        require: true,
        minlength: 4, 
        maxlength: 200
    },
    telephone: {
        type: String,
        required:true,
        maxlength:15
    },
    
    address:{
      type:String,
      required: true
    },
    occupation:{
        type:String,
        required: true,
        maxlength: 200
        },
});

module.exports = mongoose.model('guarantor', guarantorSchema)


