const frisby = require('frisby');
const Joi = frisby.Joi; 

const userCredential = { // change the email and password
  email:"okaformiracle_1@yahoo.com",
  password:"whyme"
};
const loanReqDetail = {
  guarantorId : "5b2e35de96ed511b64463d4e",// Please change this to your prefered guarantor
  tenure : 12,
  amount : 20000
};

const loanDisburseDetails = {
  amountDisbursed : loanReqDetail.amount,
  amountDisbursedReason : "Loading..."
}

// Test For Login
  it('Login User RETURNS status `200` SUCCESSFUL/OK', function () {
    return frisby.post('http://localhost:3000/users/login',userCredential)
    .expect('status', 200)
    .expect('json','status',true)
    .then(function (res) {
      const token = res._json.payload.token;
      frisby.globalSetup({
        request: {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          }
        }
      });
    });
  });
  /*
    Test For Loan Request Approval
  */
  it('Loan Request Should RETURN status `201` CREATED', function () {
    // login the user
    return frisby.post('http://localhost:3000/users/login',userCredential)
    .expect('status', 200)
    .expect('json','status',true)
    .then(function (res) {
      // gets the user id
      return res._json.payload.user_details._id;
    })
    .then(userId=>{
      // request for loan
      loanReqDetail.userId = userId;
      console.log("**** IN LOAN REQUEST ******");
      return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
      .expect('status',201)
      .expect('json','status',true)
      .inspectJSON();
    });
    }
  );
  /*
    Test For Loan Guarantor Approval
  */
  it('Guarantor Loan Approval RETURNS status `200` SUCCESSFUL/OK', function () {
    // login the user
    return frisby.post('http://localhost:3000/users/login',userCredential)
    .expect('status', 200)
    .expect('json','status',true)
    .then(function (res) {
      // gets the user id
      return res._json.payload.user_details._id;
    })
    .then(userId=>{
      // request for loan
      loanReqDetail.userId = userId;
      return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
      .expect('status',201)
      .expect('json','status',true)
      .then((res)=>{
        // get the loanId to be approved
        return res._json.payload._id;
      })
    })
    .then(loanId=>{
      // Guarantor approves loan request
      console.log("**** IN GUARANTOR LOAN APPROVAL ******");
      return frisby.get('http://localhost:3000/loans/approve/'+loanId)
        .expect('status', 200)
        .expect('json','status',true)
        .inspectJSON();
    })
  });
  /*
    Test For Loan Acceptance
  */
 it('Loan Acceptance RETURN status `200` OK', function () {
  // login the ADMIN
  return frisby.post('http://localhost:3000/users/login',userCredential)
  .expect('status', 200)
  .expect('json','status',true)
  .then(function (res) {
    // gets the user id
    return res._json.payload.user_details._id;
  })
  .then(userId=>{
    // request for loan
    loanReqDetail.userId = userId;
    return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
    .expect('status',201)
    .expect('json','status',true)
    .then((res)=>{
      // get the loanId to be approved
      return res._json.payload._id;
    })
  })
  .then(loanId=>{
    // Guarantor approves loan request
    return frisby.get('http://localhost:3000/loans/approve/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .then(res=>{
        let loanId = "0000";
        if(res._json.payload.guarantorApproved){
          loanId = res._json.payload._id;
        }
        return loanId;
      });
  })
  // admin accepts the loan upon guarantor approval
  .then(loanId=>{
    console.log("**** IN LOAN ACCEPT ******");
    return frisby.get('http://localhost:3000/loans/accept/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .inspectJSON();
  })
});
  /*
    Test For Loan DISBURSEMENT
  */
 it('Loan Disbursement RETURN status `200` OK/SUCCESSFUL', function () {
  // login the ADMIN
  return frisby.post('http://localhost:3000/users/login',userCredential)
  .expect('status', 200)
  .expect('json','status',true)
  .then(function (res) {
    // gets the user id
    return res._json.payload.user_details._id;
  })
  .then(userId=>{
    // request for loan
    loanReqDetail.userId = userId;
    return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
    .expect('status',201)
    .expect('json','status',true)
    .then((res)=>{
      // get the loanId to be approved
      return res._json.payload._id;
    })
  })
  .then(loanId=>{
    // Guarantor approves loan request
    return frisby.get('http://localhost:3000/loans/approve/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .then(res=>{
        let loanId = "0000";
        if(res._json.payload.guarantorApproved){
          loanId = res._json.payload._id;
        }
        return loanId;
      });
  })
  // admin accepts the loan if guarantor approves
  .then(loanId=>{
    return frisby.get('http://localhost:3000/loans/accept/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .then(res=>{
        let loanId = "0000";
        if(res._json.payload.isApproved){
          loanId = res._json.payload._id;
        }
        return loanId;
      });
  })
  // If Loan have been accepted then its time to disburse
  .then(loanId=>{
    console.log("**** IN LOAN DISBURSEMENT ******");
    return frisby.put('http://localhost:3000/loans/disburse/'+loanId,loanDisburseDetails)
      .expect('status', 200)
      .expect('json','status',true)
      .inspectJSON();
  })
});
  /*
    Test For Loan REJECT
  */
 it('Loan REJECT RETURN status `200` OK/SUCCESSFUL', function () {
  // login the ADMIN
  return frisby.get('http://localhost:3000/users/login',userCredential)
  .expect('status', 200)
  .expect('json','status',true)
  .then(function (res) {
    // gets the user id
    return res._json.payload.user_details._id;
  })
  .then(userId=>{
    // request for loan
    loanReqDetail.userId = userId;
    return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
    .expect('status',201)
    .expect('json','status',true)
    .then((res)=>{
      // get the loanId to be approved
      return res._json.payload._id;
    })
  })
  .then(loanId=>{
    // Guarantor approves loan request
    return frisby.get('http://localhost:3000/loans/approve/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .then(res=>{
        let loanId = "0000";
        if(res._json.payload.guarantorApproved){
          loanId = res._json.payload._id;
        }
        return loanId;
      });
  })
  // admin accepts the loan if guarantor approves
  .then(loanId=>{
    return frisby.get('http://localhost:3000/loans/accept/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .then(res=>{
        let loanId = "0000";
        if(res._json.payload.isApproved){
          loanId = res._json.payload._id;
        }
        return loanId;
      });
  })
  // Reject Loan
  .then(loanId=>{
    console.log("**** IN LOAN REJECT ******");
    return frisby.get('http://localhost:3000/loans/reject/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .inspectJSON();
  })
});
  /*
    Test For Loan DELETE
  */
 it('Loan DELETE RETURN  status `200` OK/SUCCESSFUL', function () {
  // login the ADMIN
  return frisby.post('http://localhost:3000/users/login',userCredential)
  .expect('status', 200)
  .expect('json','status',true)
  .then(function (res) {
    // gets the user id
    return res._json.payload.user_details._id;
  })
  .then(userId=>{
    // request for loan
    loanReqDetail.userId = userId;
    return frisby.post('http://localhost:3000/loans/request',loanReqDetail)
    .expect('status',201)
    .expect('json','status',true)
    .then((res)=>{
      // get the loanId to be approved
      return res._json.payload._id;
    })
  })
  // DELETE LOAN
  .then(loanId=>{
    console.log("**** IN LOAN DELETE ******");
    return frisby.del('http://localhost:3000/loans/delete/'+loanId)
      .expect('status', 200)
      .expect('json','status',true)
      .inspectJSON();
  })
});

