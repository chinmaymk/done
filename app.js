/**
 * This is for the purpose of avoiding deeply nested paths
 * @type {[type]}
 */
global.rr = function(p) {
  var path = require('path');
  return require(path.join(__dirname, p));
};


/**
 * You know, the usual. Don't change the order
 * @type {[type]}
 */
var express = require('express');

var routes = rr('./routes');
var bootstrap = rr('./bootstrapper');
var app = express();

bootstrap.views(app);
bootstrap.middleware(app);
bootstrap.database();

app.use('/', routes);

bootstrap.errorHandlers(app);


// let the party begin
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  var str = [
    "     _                  ",
    "  __| | ___  _ __   ___ ",
    " / _` |/ _ \\| '_ \\ / _ \\",
    "| (_| | (_) | | | |  __/",
    " \\__,_|\\___/|_| |_|\\___|"
  ].join('\n');

  console.log(str);
  console.log('server listening on port ' + server.address().port);
});

module.exports = app;