const frisby = require ('../../test_config.js');

it ('POST loan request should return 200 OK', function () {
  return frisby
    .post('http://localhost:3000/loans/request', {
        	
		"userId":"5b38447ef7e8a40e70843a25",
		"amount":4000000,
		"guarantorId":"5b3831716741232d302d335b"
    })
    .expect('status', 200)
    
    
});

it ('POST loan request should return 400 OK', function () {
  return frisby
    .post('http://localhost:3000/loans/request', {
        // userid and guarantorId cannot be thesame	
		"userId":"5b38447ef7e8a40e70843a25",
		"amount":4000000,
		"guarantorId":"5b38447ef7e8a40e70843a25"
    })
    .expect('status', 400)
    .expect('json','message', 'A user cannot be his own guarantor')
});

it ('POST loan request should return 400 OK', function () {
  return frisby
    .post('http://localhost:3000/loans/request', {
        // userid and guarantorId cannot be thesame	
		"userId":"5b38447ef7e8a40e70843a25",
		"amount":4000000,
		"guarantorId":"5b38447ef7e8a40e70843a25"
    })
    .expect('status', 400)
    .expect('json','status', false)
});