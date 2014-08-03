var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var passport = rr('/middleware/passport');

module.exports = {
  /**
   * Setup views
   * @param  {[type]} app [description]
   * @return {[type]}     [description]
   */
  views: function(app) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.locals = {
      appName: 'done'
    };
  },

  /**
   * Setup middleware
   * @param  {[type]} app [description]
   * @return {[type]}     [description]
   */
  middleware: function(app) {
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(session({
      secret: 'keyboard cat',
      saveUninitialized: true,
      resave: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));

    //auth auth auth
    app.use(passport.initialize());
    app.use(passport.session());

    app.disable('x-powered-by');
  },

  database: function() {
    mongoose.connect('mongodb://localhost/done');
    var db = mongoose.connection;
    db.once('open', function() {
      console.info('connected to database');
    });
    db.on('error', function() {
      console.error('connected to database');
    });
  },

  /**
   * 404 and 500
   * @param  {[type]} app [description]
   * @return {[type]}     [description]
   */
  errorHandlers: function(app) {

    /// catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    /// error handlers

    /* jshint ignore:start */
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
    /* jshint ignore:end */
  }
};