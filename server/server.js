const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var publicPath = path.join(__dirname + '/../public');
var {msgGen,genLocationMsg}=require('./utils/message.js');

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New clinet');

  socket.broadcast.emit('newMsg', {
    from:'Admin',
    text:'User join',
    createdAt:new Date().getTime()
  });

  socket.emit('newMsg',{
    from:'Admin',
    text:'Welcome to chatApp',
    createdAt:new Date().getTime()
  });

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  });

  socket.on('createMsg',(msg,callback)=>{
    io.emit('newMsg',msgGen(msg.from,msg.text));
    callback();
  });

  socket.on('createLocationMsg',(position,callback)=>{
    io.emit('newLocationMsg',genLocationMsg('User',position.lat,position.long));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('disconnected from client');
  });

})

server.listen(port, () => {
  console.log('Server has started on port 3000');
});
