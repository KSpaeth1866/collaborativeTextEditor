const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const {EditorState} = require('draft-js');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const User = require('./models/models').User;
const Document = require('./models/models').Document;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
    username: username
  }, function(err, user) {
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
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());

//TEST ROUTE
app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({success: true, user: req.user});
});

app.post('/register', function(req, res) {
  const newUser = new User({username: req.body.username, password: req.body.password});
  newUser.save( err => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true})
    }
  })
});

app.get('/editor/:docId', function(req, res) {
  Document.findById({_id: req.params.docId}).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, document: doc})
    }
  })
});

app.post('/editor/:docId', function(req, res) {
  const newDoc = new Document({
    editorState: EditorState.createEmpty(),
    owner: req.user._id,
    collaborators: [
      {
        userId: req.user._id
      }
    ],
    name: req.body.name
  });
  newDoc.save(err => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true})
    }
  })
});

app.post('/editor/save/:docId', function(req, res) {
  Document.findByIdAndUpdate({
    _id: req.params.docId
  }, {
    editorState: req.body.editorState
  })
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

var port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('Backend server for Electron App running on port 3000!')
})
