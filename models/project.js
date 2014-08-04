var mongoose = require('mongoose');
var bluebird = require('bluebird');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  github: {
    type: String
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

var project = mongoose.model('Project', projectSchema);

bluebird.promisifyAll(project);
bluebird.promisifyAll(project.prototype);

module.exports = project;