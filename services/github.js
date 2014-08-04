var GitHubApi = require('github');
var bluebird = require('bluebird');

var github = new GitHubApi({
	// required
	version: "3.0.0",
	// optional
	debug: true,
	timeout: 5000
});


bluebird.promisifyAll(github.repos);
module.exports = github;