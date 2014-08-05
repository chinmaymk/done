var express = require('express');
var passport = rr('/middleware/passport');
var auth = rr('/controllers/auth');
var index = rr('/controllers/index');
var project = rr('./controllers/project');
var loadProject = rr('./middleware/load-project');

var router = express.Router();

//GET home page.
router.get('/', index.index);

//authentication routes
router.get('/login', passport.authenticate('github'));
router.get('/logout', auth.logout);
router.get('/oauth/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
}), auth.oauthcallback);


router.get('/:username', project.listForUser);

//authenticate all requests henceforth
router.use('*', passport.isAuthenticated);

//some basic things related with home page
router.get('/projects/new', project.newPage);
router.post('/projects', project.create);
//edit project routes, load project object before going to controller
router.use('/:username/:project/edit', loadProject);
router.get('/:username/:project/edit/details', project.editDetailsPage);
router.get('/:username/:project/edit/workflows', project.editWorkflowsPage);
router.get('/:username/:project/edit/members', project.editMembersPage);


//utils
router.post('/markdown', index.markdown);

module.exports = router;