//APP and Server setup with socket.io
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//ROUTES
const routes = require('./routes')
app.use('/', routes);

//SOCKET EVENTS
io.sockets.on('connection', function(socket) {
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
      socket.broadcast.to(room).emit('update',data)
    })
});

var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Backend server of 💀 doom☠️  running on port 3000!')
})
