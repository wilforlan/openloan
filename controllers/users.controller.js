const UsersModel = require('../models/User');

function Register (req, res){
    res.send('reg')
}

function Login (req, res){

}

function UpdateProfile (req, res){

}

module.exports = {
    Register: Register,
    Login: Login,
    UpdateProfile: UpdateProfile
}