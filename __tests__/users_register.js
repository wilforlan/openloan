const frisby = require('frisby');

it ('POST should return a status of 200 Created', function () {
  return frisby
    .post('http://localhost:3000/users/register', {
      name: 'Alabi ibrahim',
      email: 'ibrahim@yahoo.com',
      phoneNumber: 'number',
      address: '12, Address',
      bvn: 'bvn123',
      password: 'password123'
    })
    .expect('status', 200);
});