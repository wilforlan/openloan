// const { check, validationResult } = require('express-validator/check');
const Joi = require('joi');

module.exports = {
    createUser: function(){
        [
            check('name').isString(),
            check('email').isEmail()
        ], (req, res, next) => {
            const errors = req.validationResult();
            console.log(errors.isEmpty());
            if (!errors.isEmpty()) {
                console.log('jjsjsh')
              return res.status(422).json({ errors: errors.array() });
            }
    
            next();
    
        }
    }
    // create: Joi.object().keys({
    //     name: Joi.string().min(3).required(),
    //     password: Joi.string().min(3).required(),
    //     email: Joi.string().email().required()
    // }),
    // update: Joi.object().keys({
    //     username: Joi.string().min(3).optional()
    // })
}