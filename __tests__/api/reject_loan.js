const frisby = require('frisby');

// Do setup first
frisby.globalSetup({
  request: {
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM4NDQ3ZWY3ZThhNDBlNzA4NDNhMjUiLCJuYW1lIjoiRGFtaSIsImVtYWlsIjoiZGFtaUByaWJ5LmNvbSIsInBob25lTnVtYmVyIjoiKzIzNDExMjIxMzIyMSIsImFkZHJlc3MiOiIzLCBncmFjZSBzdHJlZXQiLCJidm4iOiIxMjM0NTYxMzQzIiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNy0wMVQwMzowMzoyNi4zMzhaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDctMDFUMDM6MDM6MjYuMzM4WiIsIl9fdiI6MCwiaWF0IjoxNTMwNzcwMDU2LCJleHAiOjE1MzA5ODYwNTZ9.T8nwKfOAOfNCx1Pbf_cFY0m_jCC8neb76j1a1sIHj34',
      'Content-Type': 'application/json',
    }
  }
});


// Any global setup is automatically applied to every test
it ('uses globalSetup for rejecting loan should return 403 when disbursed', function () {
  return frisby
    .get('http://localhost:3000/loans/reject/5b3c114131124a0d7415c640')
    .expect('status', 403)
    .expect('json', 'status', false,  'message', 'Loan Has been Disbursed')
});