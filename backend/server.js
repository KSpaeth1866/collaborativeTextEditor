//APP and Server setup with socket.io
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//Draft js object to setup EditorState
const {EditorState} = require('draft-js');
//MODELS
const User = require('./models/models').User;
const Document = require('./models/models').Document;
//PASSPORT
const passport = require('./auth');
app.use(passport.initialize());
//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.json({success: true, user: req.user});
});

app.post('/register', function(req, res) {
  const newUser = new User({username: req.body.username, password: req.body.password});
  newUser.save(err => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true})
    }
  })
});

// app.use(function(req,res,next){
//   if (!req.user) {
//     res.send({success:false, message: "Not logged in!"})
//   } else {
//     next()
//   }
// })

app.get('/document/:docId', function(req, res) {
  Document.findById({_id: req.params.docId}).exec((err, doc) => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true, document: doc})
    }
  })
});

app.post('/document/new', function(req, res) {
  const newDoc = new Document({
    editorState: EditorState.createEmpty(),
    owner: req.body.user._id,
    collaborators: [],
    name: req.body.name,
  });
  newDoc.collaborators.push(req.body.user._id);
  newDoc.save(err => {
    if (err) {
      res.json({success: false, message: err})
    } else {
      res.json({success: true})
    }
  })
});

app.post('/document/save/:docId', function(req, res) {
  Document.findByIdAndUpdate({
    _id: req.params.docId
  }, {editorState: req.body.editorState})
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

io.on('connection', function(socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function(data) {
    console.log(data);
  });
});

var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Backend server for Electron App running on port 3000!')
})
