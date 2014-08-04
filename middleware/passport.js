var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var User = rr('./models/user');
var github = rr('./services/github');

//TODO find env variables
passport.use(new GitHubStrategy({
    clientID: "1e7b4ec76b1eaa4acd42",
    clientSecret: "e4aa485fb28cf99067ad6e015cccd943a21eee3b",
    callbackURL: "http://localhost:3000/oauth/github/callback",
    scope: ['user', 'repo']
  },
  function(accessToken, refreshToken, profile, done) {
    github.authenticate({
      type: "oauth",
      token: accessToken
    });
    User.findOneAsync({
      login: profile._json.login
    }).then(function(user) {
      if (user) {
        return done(null, user);
      }
      var u = new User({
        name: profile.displayName,
        login: profile._json.login,
        email: profile._json.email,
        gravatar: profile._json.avatar_url
      });

      return u.saveAsync().then(function() {
        done(null, u);
      });
    }).catch(done);
  }
));

// app.js
passport.serializeUser(function(user, done) {
  // for the time being tou can serialize the user 
  // object {accessToken: accessToken, profile: profile }
  // In the real app you might be storing on the id like user.profile.id 
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // If you are storing the whole user on session we can just pass to the done method, 
  // But if you are storing the user id you need to query your db and get the user 
  //object and pass to done() 
  done(null, user);
});

passport.isAuthenticated = function(req, res, next) {
  if (!req.user) {
    req.session.redirectTo = req.url;
    res.redirect('/?redirectTo=' + req.url);
  }
  next();
};

module.exports = passport;