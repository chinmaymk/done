/**
 * Loads the config to environment variables
 * if env varible is set, that takes precedence over config option
 */
var fs = require('fs');
var filename = './env';

module.exports = function load() {
	var conf = fs.readFileSync(filename, "utf8");
	var lines = conf.split("\n").filter(function(d) {
		return !!d;
	});
	lines.forEach(function(d) {
		var config = d.split("=").map(function(d) {
			return d.trim();
		});
		//check if its already set in enviroment, else assign from our file
		process.env[config[0]] = process.env[config[0]] || config[1];
	});
};