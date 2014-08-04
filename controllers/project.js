var User = rr('./models/user');
var Project = rr('./models/project');

/**
 * Does everything required by a project
 * @type {Object}
 */
module.exports = {
  /**
   * Home page once logs in, shows listing of project
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  list: function(req, res, next) {
    User.findById(req.user._id).populate('projects').exec().then(function(user) {
      res.locals.projects = user.projects;
      res.render('project/list');
    }, next);
  },

  /**
   * Gives the new project page
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  newPage: function(req, res) {
    res.render('project/new');
  },

  /**
   * Creates a new project
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  create: function(req, res, next) {
    var p = new Project();

    ['name', 'description'].forEach(function(d) {
      p[d] = req.body[d];
    });

    p.path = [req.user.login, p.name].join('/');
    p.members.push(req.user._id);

    User.findByIdAsync(req.user._id).then(function(user) {
      user.projects.push(p);
      return [user.saveAsync(), p.saveAsync()];
    }).then(function() {
      res.redirect([req.user.login, p.name, 'tasks'].join('/'));
    }).catch(next);
  },

  /**
   * You could edit basic details, here
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editDetails: function(req, res) {

  }

};