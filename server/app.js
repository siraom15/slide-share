var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('./db/db')

var indexRouter = require('./routes/indexRouter');
var apiRouter = require('./routes/apiRouter');
var slideRouter = require('./routes/slideRouter');
var userRouter = require('./routes/userRouter');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/api', apiRouter);
app.use('/api/slide', slideRouter);
app.use('/api/user', userRouter);

module.exports = app;
