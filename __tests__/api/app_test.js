const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exposes Joi for convenience
describe('First Test FOR LOGIN AND GET ', function () {
  it('Login User Should return status 200', function () {
    return frisby.post('http://localhost:3000/users/login',{
        email:"okaformiracle_1@yahoo.com",
        password:"whyme"
    })
      .expect('status', 200)
      .then(function (res) { // res = FrisbyResponse object
        token = res.json[0].payload.token;
        frisby.globalSetup({
            request: {
              headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
              }
            }
          });
        // return frisby
        //     .get('http://localhost:3000/loans/')
        //     .expect('status', 200);
      });
  });
});
