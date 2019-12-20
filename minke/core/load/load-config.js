const loadFile = require('./load-file');
const checkReservedFileName = require('./check-reserved-filename');

module.exports = (dir, pattern = 'config/**/*.+(js|json)') =>
  loadFile(dir, pattern, {
    requireFn: require, // 后期需要解析.json文件中的${}字符串
    fileNameAsKey: checkReservedFileName,
    globArgs: {
      dot: true,
    }
  });
