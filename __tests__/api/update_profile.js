const frisby = require('frisby');
const joi = frisby.joi

frisby.globalSetup({
    request: {
      headers: {
          'content-type': 'application/json',
          'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjNiMjQ5YjBkMjE2NjQ1YjQwNDQ3YWEiLCJuYW1lIjoia2VtaSBvcGUiLCJlbWFpbCI6Im9wZTRyZWFsQGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDgwNDA0ODQ4ODQiLCJhZGRyZXNzIjoibm80IG9uaSBzdHJ0IGxhZ29zIiwiYnZuIjoiMzQ1NTY3MDMzOTMiLCJwYXNzd29yZCI6IiIsImNyZWF0ZWRfYXQiOiIyMDE4LTA3LTAzVDA3OjI0OjExLjk2MloiLCJ1cGRhdGVkX2F0IjoiMjAxOC0wNy0wM1QwNzoyNDoxMS45NjJaIiwiX192IjowLCJpYXQiOjE1MzA2MTUzMjAsImV4cCI6MTUzMDgzMTMyMH0.WGTvmyAzftGRLpcW1kuamTcXSExE2JM6UIGsEcrat-w'
      }
    }
})
//guarantor approve true
 it ('GET should return a status of 200 OK', function () {
  return frisby
  .get('http://localhost:3000/loans/approve/,5b3b249b0d216645b40447aa')
.expect('status', 200);
});

//view single loan
it ('GET should return a status of 200 OK', function () {
    return frisby
    .get('http://localhost:3000/loans/5b3b249b0d216645b40447aa')
  .expect('status', 200);
  });

  //view single loan
it ('GET should return a status of 200 OK', function () {
    return frisby
    .get('http://localhost:3000/loans/')
  .expect('status', 200);
  });
