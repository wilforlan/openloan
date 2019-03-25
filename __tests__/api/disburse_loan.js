const frisby = require ('../../test_config.js');
const Joi = frisby.Joi;

it ('POST should return a status of 200 OK', function (res) {
  return frisby
    .put('http://localhost:3000/loans/disburse/5b3c114131124a0d7415c640', {
      amountDisbursed: 3500000 ,
      amountDisbursedReason: 'Insufficient fund'
      })
    .expect('status', 200)
    .expect('json', 'status', true)
    .expect('jsonTypes', 'payload.*', {
              "amount": Joi.number().required(),
              "tenure": Joi.number().required(),
              "guarantorApproved":  Joi.boolean().required(),
              "amountDisbursed": Joi.number().required(),
              "isApplication": Joi.boolean().required(),
              "isApproved": Joi.boolean().required(),
              "isDisbursed": Joi.boolean().required(),
              "isRepaid": Joi.boolean().required(),
              "amountDisbursedReason": Joi.string().required(),
              
    })
    .inspectJSON()
    .done(res)
})

it ('POST should return a status of 403 OK', function (res){
  return frisby
    .put('http://localhost:3000/loans/disburse/5b3c1ad36f33bf2e983d257e', {
      amountDisbursed: 3500000 ,
      amountDisbursedReason: 'Insufficient fund'
      })
    .expect('status', 403)
    .inspectJSON()
    .done(res)
})