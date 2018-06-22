const { check, validationResult } = require('express-validator/check');

module.exports = {
    createUser: function(){
        [
            check('name').isString(),
            check('email').isEmail()
        ], (req, res, next) => {
            const errors = validationResult(req);
            console.log(errors.isEmpty());
            if (!errors.isEmpty()) {
                console.log('jjsjsh')
              return res.status(422).json({ errors: errors.array() });
            }
    
            next();
    
        }
    }
}