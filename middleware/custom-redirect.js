/**
 * Implements few quick wins for locals
 */

module.exports = function() {
  return function(req, res, next) {
    res.set('X-PJAX-URL', req.url);
    next();
  };
};