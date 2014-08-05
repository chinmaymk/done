var Project = rr('./models/project');
var User = rr('./models/user');

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
    Project.findAsync({
      members: req.user._id
    }).then(function(projects) {
      res.locals.projects = projects;
      res.render('project/list');
    }).catch(next);
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

    p.saveAsync().then(function() {
      res.redirect([req.user.login, p.name, 'edit', 'workflows'].join('/'));
    }).catch(next);
  },

  /**
   * You could edit basic details, here
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editDetailsPage: function(req, res) {
    res.render('project/edit-details');
  },

  /**
   * You can edit types and states and their order here.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editWorkflowsPage: function(req, res) {

    res.render('project/edit-workflows');
  },

  /**
   * Add or remove members, the usual
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editMembersPage: function(req, res) {
    res.render('project/edit-members');
  },

  listForUser: function(req, res, next) {
    User.findOneAsync({
      login: req.params.username
    }).then(function(user) {
      return Project.findAsync({
        members: user._id
      });
    }).then(function(projects) {
      res.locals.projects = projects;
      res.render('project/list');
    }).catch(next);
  }

};