const frisby = require('frisby');
frisby.globalSetup({
  request: {
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjM0YzRiMDMzODExZjExOWM0YzA3N2EiLCJuYW1lIjoiTWlyYWNsZSBFbWVrYSIsImVtYWlsIjoib2thZm9ybWlyYWNsZV8xQHlhaG9vLmNvbSIsInBob25lTnVtYmVyIjoiMDcwMTY2OTQ3NjciLCJhZGRyZXNzIjoiTGFnb3MgQnJhbmNoIiwiYnZuIjoiMjAxOTIzNjM2ODMzIiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNi0yOFQxMToyMToyMC4zMjFaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDYtMjhUMTE6MjE6MjAuMzIxWiIsIl9fdiI6MCwiaWF0IjoxNTMwMzAxNTgyLCJleHAiOjE1MzA1MTc1ODJ9.vD0wKxvrCbjyu1dZbLVBfOn9Qbyn9gxId2f_YYe9igI',
      'Content-Type': 'application/json',
    }
  }
});
module.exports = frisby;