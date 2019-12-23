const _ = require('lodash');

module.exports = minke => {
  // 将路由集中在minke.config.routes中
  minke.config.routes = Object.keys(minke.app || []).reduce((acc, key) => {
    return acc.concat(_.get(minke.app[key], 'config.routes') || {});
  }, []);
  // 将中间件defaults文件加载到minke.config.middleware.settings中
  minke.config.middleware.settings = Object.keys(minke.middleware).reduce(
    (acc, current) => {
      const currentSettings = _.get(
        _.cloneDeep(minke.middleware[current]),
        ['defaults', current],
        {}
      );
      acc[current] = !_.isObject(currentSettings) ? {} : currentSettings;
      _.defaults(acc[current], { enabled: false });
      return acc;
    },
    {}
  );
  minke.config.hook.settings = Object.keys(minke.hook).reduce(
    (acc, current) => {
      const currentSettings = _.get(_.cloneDeep(minke.hook[current]), ['defaults', current]);
      acc[current] = !_.isObject(currentSettings) ? {} : currentSettings;
      _.defaults(acc[current], { enabled: false });
      return acc;
    },
    {}
  )
  // 组装控制器
  minke.controllers = Object.keys(minke.app || []).reduce((acc, key) => {
    for(let index in minke.app[key].controllers) {
      let controller = minke.app[key].controllers[index];
      controller.indentity = controller.identity || _.upperFirst(index);
      acc[index] = controller;
    }
    return acc;
  }, {});
}



