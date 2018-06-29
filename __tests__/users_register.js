const frisby = require('frisby');

//Test feature for a successful signUp
it ('POST should return a status of 200 Created', function () {
  return frisby
    .post('http://localhost:3000/users/register', {
      name: 'Alabi ibrahim',
      email: 'ibrahim@yahoo.com',
      phoneNumber: '08060573758',
      address: '12, Address',
      bvn: 'bvn123',
      password: 'password123'
    })
    .expect('status', 200);
});

//Test feature for user registering with the same Email address
it ('POST should return a status of 403 Forbidden', function () {
  return frisby
    .post('http://localhost:3000/users/register', {
      name: 'Ola Sulaimon',
      email: 'ibrahim@yahoo.com',
      phoneNumber: '08012345677',
      address: '15, Address',
      bvn: 'bvn12345',
      password: 'password123'
    })
    .expect('status', 403);
});