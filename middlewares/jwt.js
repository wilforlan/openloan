/**
 * Created by BenX on 3/31/2017.
 */
var jwt = require('jsonwebtoken');

var JWT = {};

JWT.verifyToken = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        return res.status(403).json({ status: false, message: 'No token provided', payload: null});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, verifyCallBack);

		function verifyCallBack(error, decoded) {
		    if (error) {
		        return res.status(401).json({status:false, message: error.message});
		    }

		    res.decoded = decoded;
		    next();
		}
};

module.exports = JWT;
