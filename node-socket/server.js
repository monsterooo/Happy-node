const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


http.listen(1024, '0.0.0.0', function(){
  console.log('listening on *:1024');
});

io.on('connection', async(socket) => {
  socket.emit('data', 'hi!');
  console.log('connected > ');
});
