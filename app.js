var express = require('express');
require('dotenv').config()
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
const genders = require('./routes/gender');
const hackers = require('./routes/hacker');
const info = require('./routes/info');

const helemt = require('helmet');
const cors = require('cors');

var app = express();

//Enable pre-flight CORS for all routes
app.options('*', cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helemt());
app.use(cors());

app.use('/', routes);
app.use('/gender', genders)
app.use('/hackers', hackers)
app.use('/info', info);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app;
