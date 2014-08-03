var express = require('express');
var passport = rr('/middleware/passport');
var auth = rr('/controllers/auth');
var index = rr('/controllers/index');

var router = express.Router();

/* GET home page. */
router.get('/', index.index);


/**
 * Authentication routes
 */
router.get('/login', passport.authenticate('github'));
router.get('/logout', auth.logout);
router.get('/oauth/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
}), auth.oauthcallback);


module.exports = router;