/**
 * Implements few quick wins for locals
 */
var marked = rr('./services/marked');

module.exports = function() {
  return function(req, res, next) {
    res.locals = {
      user: req.user,
      params: req.params,
      pjax: !!req.headers['x-pjax'],
      marked: marked
    };
    next();
  };
};