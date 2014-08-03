/**
 * Implements few quick wins for locals
 */
module.exports = function() {
  return function(req, res, next) {
    res.locals = {
      user: req.user,
      params: req.params,
      pjax: !!req.headers['x-pjax']
    };
    next();
  };
};