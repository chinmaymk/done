/**
 * Some utils, could be shared by entire project.
 */
module.exports = {

  /**
   * Joins multiple arguments in a URL
   * @return {[type]} [description]
   */
  url: function() {
    return Array.prototype.join.call(arguments, '/');
  },

  /**
   * creates a random number in range
   * @param  {[type]} min [description]
   * @param  {[type]} max [description]
   * @return {[type]}     [description]
   */
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};