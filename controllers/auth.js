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
    var redirectTo = req.session.redirectTo || '/';
    res.redirect(redirectTo);
    delete req.session.redirectTo;
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