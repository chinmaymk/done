var mongoose = require('mongoose');
var bluebird = require('bluebird');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
  },
  gravatar: {
    type: String,
    required: true
  },
});

var user = mongoose.model('User', userSchema);

bluebird.promisifyAll(user);
bluebird.promisifyAll(user.prototype);

module.exports = user;