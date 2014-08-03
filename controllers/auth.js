/**
 * Responsible for user management
 * @type {Object}
 */
module.exports = {
  /**
   * Called when github calls us back.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  oauthcallback: function(req, res) {
    res.redirect('/');
  },

  /**
   * Bye bye
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};