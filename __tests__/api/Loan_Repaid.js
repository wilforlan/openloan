const frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjMzYjE5ODNhMzdiYjEzNDg0NWQ2YWMiLCJuYW1lIjoiU29tdG93dyIsImVtYWlsIjoiYW1hYWFAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwOTAzNDQzNTUzMyIsImFkZHJlc3MiOiJoZWRxIGRqZCIsImJ2biI6IjIzNDQ1NjI2NjU2IiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNi0yN1QxNTo0NzozNi45MDRaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDYtMjdUMTU6NDc6MzYuOTA0WiIsIl9fdiI6MCwiaWF0IjoxNTMwNjMxNDcxLCJleHAiOjE1MzA4NDc0NzF9.Z5aVhrjf5nG-sCJb9ucagDdeOWdcowrnRK6UfAL9Bjk'
        }
    }
});

// Test case for Loan repaid
it ('Get should return a status of 200 Ok', function () {
  return frisby.get('http://localhost:3000/loans/repaid/5b3b9b5cab95240e4c890305')
    .expect('status', 200);
});

// Test case for checking for double entry
it ('Get should return a status of 403 Forbidden', function () {
    return frisby.get('http://localhost:3000/loans/repaid/5b3b9b5cab95240e4c890305')
      .expectNot('status', 200)
      .expect('status', 403)
  });