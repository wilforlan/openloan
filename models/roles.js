const mongoose = require (mongoose);

const RolesSchema = mongoose.schema({
   title: {
  	type:String,
  	required: true,
 	minlength: 4,
 	maxlength: 200
  },
  permission_array_ids:{
  	type:Array,
  	required: true
  }

});

module.exports= mongoose.model('roles', RolesSchema);