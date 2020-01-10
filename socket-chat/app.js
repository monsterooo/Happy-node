var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const httpApp = http.Server(app);
const io = require('socket.io')(httpApp);

// socket
io.on('connection', function(socket){
  /**
   * socket 结构字段说明
   * socket.id 会话唯一标识来之客户端
   * socket.rooms 用户所加入的房间 { roomName: roomName, [socket.id]: socket.id }, getter => [ <socket.id>, 'room 237' ]
   * socket.client 用户的Client对象实例
   * socket.conn 一个对Client传输连接的引用(engine.io Socket)对象
   * socket.request 一个返回engine.io Client对象的request的代理getter
   * socket.handshake 握手信息对象
   * socket.handshake = {
   *   headers, // 握手头信息
   *   time, // 创建时间(字符串格式)
   *   address, // 客户端ip
   *   xdomain, // 连接是否跨域
   *   secure, // 连接是否安全
   *   issued, // 创建时间(时间戳)
   *   url, // 请求url字符串 "/socket.io/?EIO=3&transport=polling&t=M-E-dB3"
   *   query, // query string
   * }
   * socket.use 注册一个中间件
   * socket.send 发送一个`message`事件消息
   * socket.emit 发送一个指定名称的事件消息
   * socket.on 注册监听客户端emit过来的事件
   * socket.eventNames 获取所有监听的事件
   * socket.join 将一个客户端加入到指定名称的房间
   * 
   */

  // socket.join('room 1', () => {
  //   let rooms = Object.keys(socket.rooms);
  //   console.log(rooms); // [ <socket.id>, 'room 237' ]
  // });
  // socket.broadcast.emit('hi'); // 广播除自己以外消息
  // socket.send('hi send!')
  socket.emit('emit event', 'emit event data', (data) => {
    console.log(data); // 客户端fn(data)中的data数据
  });
  // socket.to(socket.id).emit('my message', 'something message');
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  console.log('socket.eventNames > ', socket.eventNames());
});


httpApp.listen(3000, '0.0.0.0', function(){
  console.log('listening on *:3000');
});
