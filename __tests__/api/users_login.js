const frisby = require('frisby');
const Joi = frisby.Joi;
//testing login route with valid values
it ('should return status 200', function () {
  return frisby
    .post('http://localhost:3000/users/login',{
        "email":"dami@riby.com",
        "password":"pass123"

    })
    .expect('status', 200)
    .expect('json', 'status', true, 'message', 'success' )
    .expect('jsonTypes', 'payload.*', { // Assert *each* object in 'items' array
      'token': Joi.string(),
      'user_details': Joi.array(),
    }, 'user_details.*',{
        'id': Joi.string().required(),
      'email': Joi.string().email().required(),
      'phoneNumber': Joi.string().required().max(11),
     })
    });


//testing login route with invalid password
it ('should return status 400', function () {
  return frisby
    .post('http://localhost:3000/users/login',{
        "email":"dami@riby.com",
        "password":"wrongPassword"

    })
    .expect('status', 400)
    .expect('json', 'status', false, 'message', 'Incorrect login credentials, please try again')
});

