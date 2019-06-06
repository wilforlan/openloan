const frisby = require('../../test_config');
it ('DELETE LOANS should return a status of 200 OK', function (res) {
  return frisby
    .del('http://localhost:3000/loans/delete/put-your-loan-id-here')//add your loan id here
    .expect('status', 200)
    .expect('json', 'status',true)
    .inspectJSON()
    .done(res)
});