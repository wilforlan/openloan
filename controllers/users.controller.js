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
                res.status(400).json({'status': false, 'message': 'Incorrect login credentials, please try again.', payload: null})
            }

            User.password = "";
            console.log(User)
            var token = jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 60
            });

            var payload = [{}];
            payload.token = token;
            payload.user_details = User;
            res.status(200).json({'status': true, 'message': 'Success', payload: payload})
        });

}

function UpdateProfile (req, res){
    // Needs AUTH
    res.send("Working")
}

module.exports = {
    Register: Register,
    Login: Login,
    UpdateProfile: UpdateProfile
}