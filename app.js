var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/portfolio');


var routes = require('./routes/index');
var about = require('./routes/about');
var admin = require('./routes/admin');
var blog = require('./routes/blog');
var works = require('./routes/works');
var auth = require('./routes/auth');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fosdf37dhDHD3sd9LJDo',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ url: 'mongodb://localhost/portfolio' })
}));
app.use(require('node-sass-middleware')({
  src: __dirname + '/scss',
  dest: __dirname + '/public/css',
  indentedSyntax: false,
  debug: true,
  sourceMap: true,
  prefix: '/css'
}));



app.use('/', routes);
app.use('/blog', blog);
app.use('/admin', admin);
app.use('/works', works);
app.use('/about', about);
app.use('/auth', auth);


// Logout endpoint
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});


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
    //res.render('404');
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
  //res.render('404');
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
