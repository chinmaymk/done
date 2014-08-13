var mongoose = require('mongoose');
var bluebird = require('bluebird');
var util = rr('./services/util');

var stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
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

typeSchema.index({
  name: 'text'
});

/**
 * Gets the types by project id and sorts them by order
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
typeSchema.statics.getByProjectId = function(id, callback) {
  this.find({
    project: id,
  }, function(err, types) {
    types.forEach(function(d) {
      d.states = d.states.sort(function(a, b) {
        return a.order - b.order;
      });
    });
    callback(err, types);
  });
};

var type = mongoose.model('Type', typeSchema);

//Some handy colors to get everything flat.
type.COLORS = [
  '#E74C3C',
  '#2ECC71',
  '#3498DB',
  '#1ABC9C',
  '#9B59B6',
  '#F1C40F',
  '#E67E22',
  '#95A5A6',
  '#7F8C8D',
  '#ECF0F1',
  '#BDC3C7',
  '#34495E',
  '#2C3E50'
];

type.getRandomColor = function() {
  return type.COLORS[util.getRandomInt(0, type.COLORS.length)];
};

bluebird.promisifyAll(type);
bluebird.promisifyAll(type.prototype);

module.exports = type;