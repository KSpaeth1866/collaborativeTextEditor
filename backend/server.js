//App and Server setup with socket.io
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}).then(() => console.log('Connected to 🦍')).catch((err) => console.error(err));;
mongoose.Promise = global.Promise;
//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Session
app.use(session({
  secret: 'nibbit',
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
//Passport
const passport = require('./auth');
app.use(passport.initialize());
app.use(passport.session());
//ROUTES
const routes = require('./routes')
app.use('/', routes);
//SOCKET EVENTS
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('documentJoin', (data) => {
    socket.join(data.docId);
  });

  socket.on('documentLeave', (data) => {
    socket.broadcast.to(data.docId).emit('userLeave', {
      color: data.color,
    })
    socket.leave(data.docId);
  });

  socket.on('changeEditorState', (data) => {
    socket.broadcast.to(data.docId).emit('updateEditorState', {
      contentState: data.contentState,
      selectionState: data.selectionState,
      color: data.color,
      username: data.username,
    })
  })

  socket.on('changeName', (data) => {
    socket.broadcast.to(data.docId).emit('updateName', {
      name: data.name,
    })
  })

  socket.on('cursor', (data) => {
    console.log('cursor: ', data);
    socket.broadcast.to(data.docId).emit('updateCursor', {
      loc: data.loc,
    })
  })
});

//Listen
var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Backend server of 💀 doom☠️  running on port 3000!')
})
