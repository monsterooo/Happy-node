const _ = require('lodash');
const http = require('http');
const EventEmitter = require('events');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const load = require('./core/load');
const bootstrap = require('./core/bootstrap');
const initializeMiddlewares = require('./middlewares');

class Minke extends EventEmitter {
  constructor({ dir } = {}) {
    super();
    this.dir = dir || process.cwd();
    this.koa = new Koa();
    this.router = new KoaRouter();
    this.server = http.createServer(this.koa.callback());
    this.app = {};
    this.plugins = {};
    this.config = {
      middleware: {},
    };
    this.utils = {};
  }
  async start(cb) {
    console.log('start')
    await this.load();
    this.koa.use(this.router.routes()).use(this.router.allowedMethods());
    this.server.listen(3000, async err => {
      if (err) return log('监听端口错误');
      log('开始监听端口3000');
    })
  }
  async load() {
    const [ app, config, middleware, hook ] = await Promise.all([
      load.loadApp(this),
      load.loadConfigWrap(this),
      load.loadMiddleware(this),
      load.loadHook(this),
    ]);
    _.merge(this.config, config);
    this.app = app;
    this.hook = hook;
    this.middleware = middleware;
    await bootstrap(this);
    initializeMiddlewares.call(this);
    log('config ', this.config)
  }
}

module.exports = options => {
  const minke = new Minke(options);
  global.minke = minke; // 为全局对象保留minke对象实例
  return minke;
}
global.log = (...args) => {
  console.log.apply(this, args);
}
global.table = (...args) => {
  console.table.apply(this, args);
}