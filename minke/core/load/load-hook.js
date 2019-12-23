const path = require('path');
const _ = require('lodash');
const glob = require('./glob');

module.exports = async ({ dir }) => {
  let hook = {}; // 加载的Hook对象

  await Promise.all([
    loadLocalHook(dir, hook),
  ]);
  return hook;
}
const loadHookInDir = async (dir, hook) => {
  const files = await glob('*/*(index|defaults).*(js|json)', { cwd: dir });
  files.forEach(v => {
    const name = v.split('/')[0]; // hook/name 钩子名称
    mountHook(name, [path.resolve(dir, v)], hook);
  })
}
const loadLocalHook = (dir, hook) =>
  loadHookInDir(path.resolve(dir, 'hooks'), hook);

const mountHook = (name, files, hook) => {
  files.forEach(file => {
    // 循环依赖的Hooks包，在package中(TODO: 暂未实现)
    hook[name] = hook[name] || { loaded: false }; // 获取已加载过的hook或者初始化一个对象
    // 保证为hook只定义一次.load属性
    if(_.endsWith(file, 'index.js') && !hook[name].load) {
      Object.defineProperty(hook[name], 'load', {
        configurable: false,
        enumerable: true,
        // 当调用hooks[name].load时，通过require(file)加载文件。并且调用一次hook传入minke对象实例
        get: () => require(file)(minke)
      });
      return;
    }
    if(_.endsWith(file, 'defaults.json')) {
      hook[name].defaults = require(file);
      return;
    }
  })
}