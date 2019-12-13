const _ = require('lodash');
const path = require('path');
const glob = require('../glob');
const pathToObject = require('./path-to-object');

/**
 * 加载文件并根据文件夹路径创建出一个对象
 * 比如加载路径为: ['page/routes/page.json']
 * 创建后的对象为: { page: { routes: { page: { 路由内容 } } } }
 * @param {string} dir 需要加载的文件跟路径
 * @param {string} pattern 一个glob文件匹配字符串
 * @param {Object} options 一个配置对象
 * @param {Function} options.useFileNameAsKey 是否将文件夹名也作为对象路径中的键
 */
module.exports = async (
  dir,
  pattern,
  { useFileNameAsKey = () => true } = {}
) => {
  const apiFiles = {};
  // 相对路径的文件 [ 'page/routes/page.json' ]
  const files = await glob(pattern, { cwd: dir });
  
  for(let file of files) {
    const absolutePath = path.resolve(dir, file);
    // 删除已经加载过的缓存文件
    delete require.cache[absolutePath];
    const loadedModule = require(absolutePath);
    // 将['page/routes/page.json'] => ['page', 'routes' ]
    const apiPath = pathToObject(file, useFileNameAsKey(file));
    // 将路径对应的文件放入到对象中
    _.merge(apiFiles, _.setWith({}, apiPath, loadedModule, Object));
  }
  console.log('apiFiles > ', apiFiles);
}