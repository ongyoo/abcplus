var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//Firebase
var firebase = require('firebase');


var routes = require('./routes/index');
var api_users = require('./routes/api/users');
var api_commons = require('./routes/api/commons');

var pg = require('pg');
var conString = "postgres://postgres@localhost:5433/postgres";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

/*
********************
*General Information
********************
Server Type: PostgreSQL
Connection Name: image_kobe
Host Name/IP Address: localhost
Port: 5432
Default Database: postgres
User Name: postgres
Save Password: No
*/


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session setup
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

var config = {
  apiKey: "AIzaSyD9dwRck_fR_thVei1Cw1eVGbgTFIdSOcE ",
  authDomain: "image-kobe.firebaseapp.com",
  databaseURL: "https://image-kobe.firebaseio.com",
  storageBucket: "image-kobe.appspot.com",
  messagingSenderId: "863974416358"
};
firebase.initializeApp(config);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use('/', routes);
app.use('/api/users', api_users);
app.use('/api/commons', api_commons);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
