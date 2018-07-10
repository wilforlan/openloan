const frisby = require('frisby');
const Joi = frisby.Joi;
var userId = "";
var loanId = "";

/*
   Test case for Logging the user in, which then returns a token and the user id generated and
   saves them in variables for dynamic testing..
*/
it ('User Login should return a status of 200 Ok', () => {
    return frisby.post('http://localhost:3000/users/login', {
        password : "finance",
        email : "riby@finance.com"
    }).expect('status', 200)
    .then((res) => {
        let token = res.json[0].payload.token;
        let usrId = res.json[0].payload.user_details._id;
        userId = usrId;
        
        frisby.globalSetup({
            request: {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                }
            }
        });

    });
});

// Test case for requesting a Loan with an invalid token
it ('False token should return a status of 401 Unauthorized', () => {
    return frisby.setup({
        request: {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 1234,
            }
        }
    }).post('http://localhost:3000/loans/request', {
        "userId": userId,
        "amount": 30000,
        "guarantorId": "5b33ae974b00430e889d86c4"
    })
    .expectNot('status', 201)
    .expect('status', 401)
});

// Test case for requesting a Loan
it ('RequestLoan should return a status of 201 Created', () => {
    return frisby
    .post('http://localhost:3000/loans/request', {
        "userId": userId,
        "amount": 30000,
        "guarantorId": "5b33ae974b00430e889d86c4"
    })
    .expect('status', 201)
    .expect('jsonTypes', '*', {
        'isApplication': Joi.boolean(),
        'amount': Joi.number(),
        'tenure': Joi.number()
    })
    .then((res) => {
    let lnID = res.json[0].payload._id;
    loanId = lnID;
    })
});
  
// Test case for rejecting a loan based on same userid and guarantorid
it ('Same user and guarantor\'s id\'s should return a status of 403 Forbidden',() => {
    return frisby
    .post('http://localhost:3000/loans/request', {
        "userId": userId,
        "amount": 30000,
        "guarantorId": userId
    })
    .expect('status', 403)
    .expectNot('status', 201);
});

// Test case to view a single loan
it ('View loan should return a status of 200 Ok', function () {
    return frisby.get(`http://localhost:3000/loans/${loanId}`)
    .expect('status', 200)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
        'isDisbursed': Joi.boolean(),
        'amount': Joi.number()
    });
});

// Test case to view multiple loans
it ('View loans should return a status of 200 Ok', function () {
    return frisby.get('http://localhost:3000/loans/')
    .expect('status', 200)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
        'isDisbursed': Joi.boolean(),
        'amount': Joi.number()
    });
});

// Test case to check for non existing loan
it ('View Non-existing loan should return a status of 404 Not-found', function () {
    return frisby.get('http://localhost:3000/loans/1234')
    .expectNot('status', 200)
    .expect('status', 404);
});
 
// Test case for Guarantor Approve (Truthy)
it ('Guarantor approve(true) should return a status of 202 Accepted', function () {
    return frisby.put(`http://localhost:3000/loans/approve/${loanId}`, {
        approve : true
    })
    .expect('status', 202)
    .expect('jsonTypes', '*', {
        'guarantorApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
    })
});

/* 
   Test case for Guarantor Approve (Falsy), which then changes it back to true
   for other tests to run successfully
*/
it ('Guarantor approve(false) should return a status of 202 Accepted', function () {
    return frisby.put(`http://localhost:3000/loans/approve/${loanId}`, {
        approve : false
    })
    .expect('status', 202)
    .expect('jsonTypes', '*', {
        'guarantorApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
    }).then((res) => {
        return frisby.put(`http://localhost:3000/loans/approve/${loanId}`, {
            approve : true
        });
    });
});

// Test case for double guarantor entry
it ('Double entry of Guarantor approve should return a status of 304 Not-Modified', function () {
    return frisby.put(`http://localhost:3000/loans/approve/${loanId}`, {
        approve : true
    })
    .expectNot('status', 202)
    .expect('status', 304)
});

// Test case for accept loan
it ('Accept loan should return a status of 202 Accepted', function () {
    return frisby.get(`http://localhost:3000/loans/accept/${loanId}`)
    .expect('status', 202)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'guarantorApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
    })
});

// Test case for double entry in Accept loan
it ('Double entry Accept loan should return a status of 304 Not-Modified', function () {
    return frisby.get(`http://localhost:3000/loans/accept/${loanId}`)
    .expectNot('status', 202)
    .expect('status', 304)
});

// Test case for Reject loan
it ('Reject loan should return a status of 202 Accepted', function () {
    return frisby.get(`http://localhost:3000/loans/reject/${loanId}`)
    .expect('status', 202)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'guarantorApproved': Joi.boolean(),
        'isApplication': Joi.boolean()
    })
});

/* 
   Test case for double entry (Reject Loan), which then changes Accept Loan value to true
   for other tests to run successfully
*/
it ('Double entry Reject loan should return a status of 400 Bad-Request', function () {
    return frisby.get(`http://localhost:3000/loans/reject/${loanId}`)
    .expectNot('status', 200)
    .expect('status', 400).then((res) => {
        return frisby.get(`http://localhost:3000/loans/accept/${loanId}`)
    })
});

// Test case for Disburse Loan
it ('Disburse Loan should return a status of 200 Ok', function () {
    return frisby.put(`http://localhost:3000/loans/disburse/${loanId}`, {
        amountDisbursedReason: 'We do have a lot of money....'
    })
    .expect('status', 200)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
        'isDisbursed': Joi.boolean(),
        'amountDisbursedReason': Joi.string(),
        'disbursementDate': Joi.date()
    })
});

// Test case for double entry for Disburse Loan
it ('Double entry Disburse Loan should return a status of 400 Bad-request', function () {
    return frisby.put(`http://localhost:3000/loans/disburse/${loanId}`, {
        amountDisbursedReason: 'We do have a lot of money....'
    })
    .expect('status', 400);
});

// Test case for Loan repaid
it ('Repaid loan should return a status of 202 Accepted', function () {
    return frisby.get(`http://localhost:3000/loans/repaid/${loanId}`)
    .expect('status', 202)
    .expect('jsonTypes', '*', {
        'isApproved': Joi.boolean(),
        'isApplication': Joi.boolean(),
        'isDisbursed': Joi.boolean(),
        'totalRepaidTillDate': Joi.date(),
        'isRepaid': Joi.boolean()
    })
});
  
// Test case for checking for double entry for loan Repaid
it ('Double entry of loanRepaid should return a status of 403 Forbidden', function () {
    return frisby.get(`http://localhost:3000/loans/repaid/${loanId}`)
    .expectNot('status', 202);
});