const frisby = require('frisby');

frisby.globalSetup({
    request: {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjMzYjE5ODNhMzdiYjEzNDg0NWQ2YWMiLCJuYW1lIjoiU29tdG93dyIsImVtYWlsIjoiYW1hYWFAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwOTAzNDQzNTUzMyIsImFkZHJlc3MiOiJoZWRxIGRqZCIsImJ2biI6IjIzNDQ1NjI2NjU2IiwicGFzc3dvcmQiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOC0wNi0yN1QxNTo0NzozNi45MDRaIiwidXBkYXRlZF9hdCI6IjIwMTgtMDYtMjdUMTU6NDc6MzYuOTA0WiIsIl9fdiI6MCwiaWF0IjoxNTMwNjMxNDcxLCJleHAiOjE1MzA4NDc0NzF9.Z5aVhrjf5nG-sCJb9ucagDdeOWdcowrnRK6UfAL9Bjk'
        }
    }
});

// Test case for requesting a Loan
it ('POST should return a status of 201 Created', function () {
  return frisby
    .post('http://localhost:3000/loans/request', {
        "userId": "5b33b1983a37bb134845d6ac",
        "amount": 30000,
        "guarantorId": "5b33ae974b00430e889d86c4"
    })
    .expect('status', 201);
});

// Test case for rejecting a loan based on same user and guarantor
it ('POST should return a status of 403 Forbidden', function () {
    return frisby
      .post('http://localhost:3000/loans/request', {
          "userId": "5b33ae974b00430e889d86c4",
          "amount": 30000,
          "guarantorId": "5b33ae974b00430e889d86c4"
      })
      .expect('status', 403);
});