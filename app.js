var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-validator');
var mongoose = require('mongoose');

require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loansRouter = require('./routes/loans');

var app = express();

var mongooseConnectString = 'mongodb://localhost:27017/openloan'
mongoose.connect(mongooseConnectString);
mongoose.connection.on('connected', function(err) {
  console.log("Connected to DB using chain: " + mongooseConnectString);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loans', loansRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
