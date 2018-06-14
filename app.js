var express = require('express');

var mongoose = require('mongoose');
let PORT = 3000;


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, ()=>{
    console.log('Server Running!!!')
});

module.exports = app;
