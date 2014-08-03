var mongoose = require('mongoose');
var bluebird = require('bluebird');

var userSchema = new mongoose.Schema({
  name: String
});

var user = mongoose.model('User', userSchema);

bluebird.promisifyAll(user);
bluebird.promisifyAll(user.prototype);

module.exports = user;