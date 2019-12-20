const path = require('path');
const glob = require('./glob');
const _ = require('lodash');
const relativePathToArray = require('./relative-path-to-array');

/**
 * 加载dir目录下pattern模式的文件，并且返回一个对象。
 * 对象key为目录的路径(文件名也可以做为路径的一部分可选)
 * 对象value为对应加载的数据
 * @param {string} dir 要加载文件的目录
 * @param {string} pattern 加载文件的模式，详见glob
 * @param {Object} options 加载文件选项
 * @param {Function} options.requireFn 加载文件函数，如果传递可做更细粒度的控制
 * @param {Function} options.fileNameAsKey 是否将文件夹名也作为对象路径的一部分
 * @param {Object} options.globArgs 传递扩展参数给glob库
 */
module.exports = async (
  dir,
  pattern,
  {
    requireFn = require,
    fileNameAsKey = () => true,
    globArgs = {}
  } = {}
) => {
  const app = {};
  const files = await glob(pattern, { cwd: dir, ...globArgs }); // [ book/controllers/Book.js ]
  for(let file of files) {
    const absolutePath = path.resolve(dir, file);
    delete require.cache[absolutePath]; // 删除已经加载的对应文件
    const module = requireFn(absolutePath);
    const pathArray = relativePathToArray(file, fileNameAsKey(file));
    _.merge(app, _.setWith({}, pathArray, module, Object));
  }
  return app;
}