const http = require('http');
const fs = require('fs');
const path = require('path');
let subModule = require('./subModule');
const port = 3000;

const absolutePath = path.resolve('./subModule.js');

const server = http.createServer((req, res) => {
  if ('/reload' === req.url) {
    // server.close(); // 阻止新连接，保持现有连接
  } else if ('/deleteModule' === req.url) {
    // 通过删除require.cache对应的模块再加载一次可以动态的替换模块中的内容
    delete require.cache[absolutePath];
    subModule = require('./subModule');
  }

  const result = subModule();
  res.end(`subModule: ${result}`);
});

server.listen(port, () => {
  console.log(`端口监听: ${port}`);
})