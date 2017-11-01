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
io.on('connection', function(socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function(data) {
    console.log(data);
  });
});

var port = process.env.PORT || 3000
server.listen(port, function() {
  console.log('Backend server of 💀 doom☠️  running on port 3000!')
})
