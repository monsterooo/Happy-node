const io = require('socket.io-client');
const socket = io('http://0.0.0.0:1024');


socket.on('connect', function(e){
  console.log('connected > ', e);
});
socket.on('event', function(data){});

socket.on('data', data => {
  console.log('data > ', data);
})

socket.on('disconnect', function(){
  console.log('disconnect > ');
});