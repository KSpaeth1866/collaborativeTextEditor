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
  console.log('connected');
  // once a client has connected, we expect to get a ping from them saying what room they want to join
  socket.on('documentJoin', function(doc) {
    socket.join(doc);
  });
  //Event for leaving document
  socket.on('documentLeave', function(doc) {
    socket.leave(doc);
  });
  //evet emmitted for every change to editor
  socket.on('update', (data) => {
    socket.broadcast.to(room).emit('update', data)
  })
});
//Listen
var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Backend server of 💀 doom☠️  running on port 3000!')
})
