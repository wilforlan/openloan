const frisby = require('frisby');

//testing login route with valid values
it ('should return status 200', function () {
  return frisby
    .post('http://localhost:3000/users/login',{
        "email":"dami@riby.com",
        "password":"pass123"

    })
    .expect('status', 200)
});

//testing login route with invalid password
it ('should return status 400', function () {
  return frisby
    .post('http://localhost:3000/users/login',{
        "email":"dami@riby.com",
        "password":"wrongPassword"

    })
    .expect('status', 400)
});

