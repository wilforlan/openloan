const frisby = require('frisby');

// Do setup first
frisby.globalSetup({
  request: {
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM4NDQ3ZWY3ZThhNDBlNzA4NDNhMjUiLCJuYW1lIjoiRGFtaSIsImVtYWlsIjoiZGFtaUByaWJ5LmNvbSIsInBob25lTnVtYmVyIjoiKzIzNDExMjIxMzIyMSIsImFkZHJlc3MiOiIzLCBncmFjZSBzdHJlZXQiLCJidm4iOiIxMjM0NTYxMzQzIiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNy0wMVQwMzowMzoyNi4zMzhaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDctMDFUMDM6MDM6MjYuMzM4WiIsIl9fdiI6MCwiaWF0IjoxNTMwNjU5NTI1LCJleHAiOjE1MzA4NzU1MjV9.82Q5RWbsvcMxTsiRMGDNDA746CMHseuEoCBXAZcQAxA',
      'Content-Type': 'application/json',
    }
  }
});

module.exports = frisby;
