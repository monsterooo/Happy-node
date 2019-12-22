const _ = require('lodash');
const detectRoute = require('./detectRoute');
const police = require('./policy');
/**
 * 目标是编译完成 route、polices、action
 * @param {Object} value minke.config.router 路由配置对象
 * @param {string} endpoint 一个动作和路径的组合字符串 'GET /books'
 * @param {Object} plugin 一个插件对象 暂时不实现
 */
module.exports = minke => (value, endpoint, plugin) => {
  const route = detectRoute(endpoint);
  const [controllerName, actionName] = _.trim(value.handler).split('.');
  const controllerKey = _.toLower(controllerName);
  let controller;

  // 获取控制器，这里忽略的plugin的控制。后期再进行增加
  controller = minke.controllers[controllerKey];
  const action = controller[actionName].bind(controller);

  // 收集策略方法
  const policies = [];
  policies.push(police.globalPolicy(endpoint, value, route, plugin));

  return {
    route,
    action,
  }
}