const frisby = require('frisby');

it ('POST should return a status of 201 Created', function () {
  return frisby
    .post('http://localhost:3000/users/register', {
        name: "Miracle Chuks",
        email: "samplepppl@yahoo.com",
        phoneNumber: "070166967567",
        address: "Lagos",
        bvn: "1234567840",
        password: "miracle"
    })
    .expect('status', 201);
});

