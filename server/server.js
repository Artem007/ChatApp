const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var publicPath = path.join(__dirname + '/../public');

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New clinet');

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  });

})

server.listen(port, () => {
  console.log('Server has started on port 3000');
});
