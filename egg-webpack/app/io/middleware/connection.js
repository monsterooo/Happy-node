// module.exports = app => {
//   return async (ctx, next) => {
//     console.log('connected > ', ctx.socket);
//     await next();
//   };
// };

module.exports = app => {
  return async (ctx, next) => {
    const { socket } = ctx;
    const { room } = socket.handshake.query;

    console.log('连接进入 > ', socket.id);
    socket.join(room); // 加入房间
    socket.on('execute', code => {
      app.io.sockets.to(room).emit('finished', code + ' - finished');
    });
    await next();
    // 断开连接
    console.log('连接断开 > ', socket.id);
  };
};
