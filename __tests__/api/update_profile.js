const frisby = require('../../test_config');
const Joi = frisby.Joi;
it ('Update Users Profile should return a status of 200 OK', function (res) {
    return frisby
      .put('http://localhost:3000/users/5b34c4b033811f119c4c077a',{
        name: "Miracle Mark Paul",
        email: "okaformiracle_1@yahoo.com",
        phoneNumber: "0701669476",
        address: "Lagos Main land jare",
        bvn: "1234567890",
        password: "change"
      })
      .expect('status', 200)
      .expect('json','status',true)
      .expect('jsonTypes', 'payload.*', { // Assert *each* object in 'payload' array
        'name': Joi.string().required(),
        'phoneNumber': Joi.string().required().min(11).max(11),
        'password': Joi.string().required(),
        'address': Joi.string(),
        'email': Joi.string().email().required(),
        'bvn': Joi.string().required().min(10).max(10),
    })
      .inspectJSON()
      .done(res);
  });