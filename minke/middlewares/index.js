const _ = require('lodash');

/**
 * 初始化中间件
 */
module.exports = async function() {
  const middlewareConfig = this.config.middleware;
  // 获取启用的中间件过滤函数
  const middlewareEnabled = key =>
    _.get(middlewareConfig, ['settings', key, 'enabled'], false) === true;
  // 启用的中间件
  const enabledMiddlewares = Object.keys(this.middleware).filter(
    middlewareEnabled
  );
  // 检查中间件是否存在
  const middlewareExists = key => !_.isUndefined(this.middleware[key]);
  // 按顺序运行中间件数组的初始化
  const initMiddlewareSeq = async middlewareArr => {
    for(let key of _.uniq(middlewareArr)) {
      await initialize(key);
    }
  };
  // 根据中间件名称初始化(initialize)中间件
  const initialize = middlewareKey => {
    const currentMiddleware = this.middleware[middlewareKey];
    if(currentMiddleware.loaded === true) return;
    const module = currentMiddleware.load;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(`(middleware: ${middlewareKey}) 加载时间过长.`),
        middlewareConfig.timeout || 1000
      );
      this.middleware[middlewareKey] = _.merge(
        currentMiddleware,
        module,
      );
      Promise.resolve()
        .then(() => module.initialize()) // 执行中间件的初始化函数
        .then(() => {
          clearTimeout(timeout);
          this.middleware[middlewareKey].loaded = true;
          resolve();
        })
        .catch(err => {
          clearTimeout(timeout);
          if (err) {
            return reject(err);
          }          
        })
    });
  }

  // 先执行所有中间件的beforeInitialize()回调
  await Promise.all(
    enabledMiddlewares.map(v => {
      const { beforeInitialize } = this.middleware[v].load;
      if (typeof beforeInitialize === 'function') {
        return beforeInitialize();
      }
    })
  );

  // 获取需要after阶段初始化的中间件
  const middlewareAfter = _.get(middlewareConfig, 'load.after').filter(middlewareExists).filter(middlewareEnabled);


  await initMiddlewareSeq(middlewareAfter);
}