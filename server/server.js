const path=require('path');
const http=require('http');

const express=require('express');

var app=express();
var server=http.createServer(app);
var publicPath=path.join(__dirname+'/../public');

app.use(express.static(publicPath));
//bla
server.listen(3000,()=>{
  console.log('Server has started on port 3000');
});
