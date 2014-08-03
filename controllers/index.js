/**
 * Index page controller
 * @type {Object}
 */
module.exports = {
  /**
   * Returns the index page
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  index: function(req, res) {
    res.render('index');
  }
};