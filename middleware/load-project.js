var Project = rr('./models/project');
/**
 * Loads project object from req.path
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports = function(req, res, next) {
	Project.findOneAsync({
		path: [req.user.login, req.params.project].join('/')
	}).then(function(p) {
		res.locals.project = p;
		next();
	}).catch(next);
};