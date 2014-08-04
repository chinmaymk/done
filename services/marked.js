/**
 * Customized markdown service, will be used for linking information
 */
var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: true,
	highlight: function(code) {
		return highlight.highlightAuto(code).value;
	}
});

module.exports = marked;