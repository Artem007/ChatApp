const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var publicPath = path.join(__dirname + '/../public');
var {msgGen,genLocationMsg}=require('./utils/message.js');
var {isRealString}=require('./utils/validator');
var {Users}=require('./utils/users.js');

app.use(express.static(publicPath));
var port = process.env.PORT || 3000;
var users=new Users();

io.on('connection', (socket) => {

  socket.on('join',(params,callback)=>{

    if(!(isRealString(params.name) && isRealString(params.room))){
      callback('Errors ininput');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUsers',users.getListUsers(params.room));

    socket.broadcast.to(params.room).emit('newMsg', msgGen('Admin',`${params.name} join`));
    socket.emit('newMsg',msgGen('Admin',`${params.name} welcome to chatApp`));

    callback();
  });

  socket.on('disconnect', (params) => {
    var user=users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUsers',users.getListUsers(user.room));
    }
  });

  socket.on('createMsg',(msg,callback)=>{
    var user=users.getUser(socket.id);
    socket.join(user.room);
    io.to(user.room).emit('newMsg',msgGen(user.name,msg.text));
    callback();
  });

  socket.on('createLocationMsg',(position,callback)=>{
    var user=users.getUser(socket.id);
    socket.join(user.room);
    io.to(user.room).emit('newLocationMsg',genLocationMsg(user.name,position.lat,position.long));
    callback();
  });

})

server.listen(port, () => {
  console.log('Server has started on port 3000');
});
