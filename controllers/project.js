var Project = rr('./models/project');
var User = rr('./models/user');
var util = rr('./services/util');
var Type = rr('./models/type');

function stateBuilder() {
  var order = 0;
  return function(name) {
    return {
      name: name,
      order: order++
    };
  };
}

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
    //take only what we need, meant to prevent some issues
    ['name', 'description'].forEach(function(d) {
      p[d] = req.body[d];
    });

    p.path = util.url(req.user.login, p.name);

    //add up the member who created this project
    p.members.push(req.user._id);

    //save the project then create corresponding types and states. 
    //come as default project
    p.saveAsync().then(function() {
      //feature
      var feature = new Type({
        name: 'feature',
        color: Type.getRandomColor(),
        project: p._id
      });

      var fsBuild = stateBuilder();
      feature.states.push(
        fsBuild('started'),
        fsBuild('completed'),
        fsBuild('reviewed'),
        fsBuild('verified'),
        fsBuild('reopened'),
        fsBuild('closed')
      );

      //bug
      var bug = new Type({
        name: 'bug',
        color: Type.getRandomColor(),
        project: p._id
      });

      var bsBuild = stateBuilder();
      bug.states.push(
        bsBuild('started'),
        bsBuild('completed'),
        bsBuild('reopened'),
        bsBuild('closed')
      );

      //stuff that can not be measure really.
      var cog = new Type({
        name: 'cog',
        color: Type.getRandomColor(),
        project: p._id
      });

      var csBuild = stateBuilder();
      cog.states.push(
        csBuild('started'),
        csBuild('finished')
      );

      return [feature.saveAsync(), bug.saveAsync(), cog.saveAsync()];
    }).then(function() {
      res.redirect(util.url(req.user.login, p.name, 'edit', 'workflows'));
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
   * Saves the new project details
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editDetails: function(req, res) {
    Project.findByIdAsync(req.body.id).then(function(project) {
      ['name', 'description'].forEach(function(d) {
        project[d] = req.body[d];
      });
      return project.saveAsync();
    }).then(function() {
      req.session.flash = 'Details saved';
      res.render('project/edit-details');
    });
  },

  /**
   * You can edit types and states and their order here.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  editWorkflowsPage: function(req, res) {
    var project = res.locals.project;
    Type.getByProjectIdAsync(project._id).then(function(types) {
      res.locals.types = types;
      res.render('project/edit-workflows');
    });
  },

  saveType: function(req, res) {
    req.session.flash = 'Workflows updated';
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

  /**
   * lists projects for a user
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
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
  },

  import: function(req, res) {
    var github = rr('./services/github');
    github.repo.getReposAsync(function(list) {
      res.send(list);
    });
  }
};