const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    title : {
        type: String,
        required : true,
        unique:true,
        trim:true,
    },
    date_created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('permissions',PermissionSchema);