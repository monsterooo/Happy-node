const path = require('path');
const _ = require('lodash');
const glob = require('./glob');

module.exports = async (minke) => {
  let middlewares = {};
  const loaders = createLoaders(minke);

  await Promise.all([
    loaders.loadInternalMiddlewares(middlewares)
  ]);
  return middlewares;
}

const createLoaders = minke => {
  // 中间件格式为两个文件 index defaults
  const loadMiddlewaresInDir = async (dir, middlewares) => {
    const files = await glob('*/*(index|defaults).*(js|json)', { cwd: dir });
    files.forEach(v => {
      const name = v.split('/')[0];
      mountMiddleware(name, [path.resolve(dir, v)], middlewares);
    })
  }
  /**
   * 加载core/middlewares目录下的中间件
   * @param {*} middlewares 
   */
  const loadInternalMiddlewares = middlewares =>
    loadMiddlewaresInDir(
      path.resolve(__dirname, '../..', 'middlewares'),
      middlewares
    );
  const mountMiddleware = (name, files, middlewares) => {
    files.forEach(file => {
      middlewares[name] = middlewares[name] || { loaded: false };

      // 如果是js文件定义对象load属性访问时加载对应中间件
      if (_.endsWith(file, 'index.js') && !middlewares[name].load) {
        return Object.defineProperty(middlewares[name], 'load', {
          configurable: false,
          enumerable: true,
          get: () => require(file)(minke),
        });
      }
      
      // 如果是json文件则直接加载到对象中
      if (_.endsWith(file, 'defaults.json')) {
        middlewares[name].defaults = require(file);
        return;
      }
    });
  };
  return {
    loadInternalMiddlewares,
  };
}