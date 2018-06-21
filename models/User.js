var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    phoneNumber: {
        type: String, 
        required: true, 
        unique: true 
    } ,
    address: {
        type: String, 
        required: true 
    },
    bvn: {
        type: String, 
        required: true, 
        unique: true 
    }
},{
    collection: 'users',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;