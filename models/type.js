var mongoose = require('mongoose');
var bluebird = require('bluebird');

var stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});


var typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  states: [stateSchema]
});

var type = mongoose.model('Type', typeSchema);

type.ensureIndex({
  name: 'text'
});

bluebird.promisifyAll(type);
bluebird.promisifyAll(type.prototype);

module.exports = type;