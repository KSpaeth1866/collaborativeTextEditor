var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const User = require('./models/models').User;
const Document = require('./models/models').Document;
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}).populate('docsList', 'ts name').exec((err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect username.'});
    }
    if (user.password !== password) {
      return done(null, false, {message: 'Incorrect password.'});
    }
    return done(null, user);
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, function(err, user) {
    done(err, user);
  });
});

module.exports = passport
