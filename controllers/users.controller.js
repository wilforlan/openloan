const UsersModel = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

function Register (req, res){
    var userCreationObject = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        bvn: req.body.bvn,
        password: bcrypt.hashSync(req.body.password)
    };
        (new UsersModel(userCreationObject)).save((err, object) => {
            console.log(err)
            if (err) {
                // drop the error info 
                res.status(422).json({'status': false, 'message': 'An Error Occured', payload: err})
            } else {
                res.status(201).json({'status': true, 'message': 'Success', payload: object});
            }
        });
}

function Login (req, res){
    UsersModel
        .findOne({ email: req.body.email })
        .exec(function(error, User) {
            if (error) {
                res.json({'status': false, 'message': 'An Error Occured', payload: null})
            }

            if (bcrypt.compareSync(req.body.password, User.password) == false) {
                res.json({'status': false, 'message': 'Incorrect login credentials, please try again.', payload: null})
            }

            User.password = "";
            console.log(User)
            var token = jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 60
            });

            var payload = {};
            payload.token = token;
            payload.user_details = User;
            res.json([{'status': true, 'message': 'Success', payload: payload}])
        });

}
/* 
    Action : complete the `UpdateProfile` function
    Date : 1st July 2018
*/
function UpdateProfile (req, res){
    const userId = req.params.id;

    LoansModel.find({ "userId": userId}, function (err, docs) {
        if(err) return res.status(400).json({'status':false,'message':'An Error occured','payload':null});
        if(!docs.isRepaid) return res.json({'status':false,'message':"Sorry Profile can't be updated because you have a pending loan to pay off",'payload':null})
        const userProfileUpdateObject = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            bvn: req.body.bvn,
            password: bcrypt.hashSync(req.body.password)
        };
        UsersModel.findByIdAndUpdate(userId,userProfileUpdateObject,{new:true},(error,user)=>{
            if(error) return res.status(400).json({'status':false,'message':'An Error occured','payload':null});
            res.status(200).json({'status':true,'message':'Users Profile Update Successful','payload':user})
        })
    });
}

module.exports = {
    Register: Register,
    Login: Login,
    UpdateProfile: UpdateProfile
}