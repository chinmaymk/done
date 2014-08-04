/**
 * Index page controller
 * @type {Object}
 */
var projectCtrl = rr('./controllers/project');
var marked = rr('./services/marked');

module.exports = {
  /**
   * Returns the index page
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  index: function(req, res) {
    if (!req.user) {
      return res.render('pages/landing');
    }
    projectCtrl.list(req, res);
  },

  /**
   * Converts text to markdown
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  markdown: function(req, res) {
    res.send(marked(req.body.body));
  }
};