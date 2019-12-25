const http = require('http');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const _ = require('lodash');

class RouteDesign {
  constructor() {
    this.koa = new Koa();
    this.router = new KoaRouter();
    this.server = http.createServer(this.koa.callback());
    this.dir = process.cwd();
    this.config = {
      // routes: [],
    };
    this.setRouteMethod();
    this.controllers = { // 模拟控制器
      books: {
        index: ctx => {
          ctx.body = 'Monsterooo';
        },
        put: ctx => {
          log('put > ');
          ctx.body = 'books/put'
        }
      },
      posts: {
        index: ctx => {
          ctx.body = 'posts/index';
        },
        new: ctx => {
          ctx.body = 'posts/new';
        },
        create: ctx => {
          ctx.body = 'posts/create';
        },
        show: ctx => {
          log('show > ', ctx.params);
          ctx.body = 'posts/show';
        },
        edit: ctx => {
          log('edit > ', ctx.params);
          ctx.body = 'posts/edit';
        },
        update: ctx => {
          log('edit > ', ctx.params);
          ctx.body = 'posts/update';
        },
        destroy: ctx => {
          log('edit > ', ctx.params);
          ctx.body = 'posts/destroy';
        }
      }
    }
  }

  /**
   * 匹配一个path到对应的控制器
   * @param {string} path 访问的路径
   * @param {Object} options 其他匹配选项
   * @param {string} options.controller 路径绑定的控制器
   * @param {string} options.action 路径绑定的动作
   * @param {string} options.method 访问的方法, 支持标准的HTTP谓词
   * @param {string|Function} options.to 简写方式标识控制器和方法: controller#action。to如果是一个函数它的绑定优先级最高
   */
  match(path, {
    controller,
    action,
    method,
    to,
  } = {}) {
    const { controllers, router } = this;

    if(!_.isEmpty(to) && _.isString(to)) [controller, action] = to.split('#');
    action = _.get(controllers, [controller, action], Function).bind(controllers);
    method = _.isArray(method) ? method : [method];
    _.each(method, v => {
      router[v.toLowerCase()](path, _.isFunction(to) ? to : action);
    });
  }
  /**
   * 创建一个资源路由
   * @param {string} name 路由名称
   */
  resources(name) {
    const actionMap = {
      index: name => {
        this.get(`/${name}`, {to: `${name}#index`});
      },
      new: name => {
        this.post(`/${name}/new`, {to: `${name}#new`});
      },
      create: name => {
        this.post(`/${name}/create`, {to: `${name}#create`});
      },
      show: name => {
        this.get(`/${name}/:id`, {to: `${name}#show`});
      },
      edit: name => {
        this.get(`/${name}/:id/edit`, {to: `${name}#edit`});
      },
      update: name => {
        this.match(`/${name}/:id`, {to: `${name}#update`, method: ['patch', 'put']});
      },
      destroy: name => {
        this.delete(`/${name}/:id`, {to: `${name}#destroy`});
      }
    };
    _.each(Object.keys(actionMap), v => {
      actionMap[v](name);
    })
  }
  /**
   * 提供HTTP动词快捷方式绑定
   */
  setRouteMethod() {
    const verb = ['get', 'post', 'put', 'patch', 'delete'];
    _.each(verb, v => {
      this[v] = (path, options) => {
        this.match(path, {...options, method: v});
      }
    })
  }

  start() {
    this.load();
    log('>>> ', this.router)
    this.koa.use(this.router.routes()).use(this.router.allowedMethods());
    this.server.listen(3000, async err => {
      if (err) return log('监听端口错误');
      log('开始监听端口3000');
    })
  }
  load() {
    const routes = require('./config/routes');

    routes(this);
  }
}

module.exports = options => {
  const routeDesign = new RouteDesign(options);
  global.routeDesign = routeDesign;
  return routeDesign;
}

global.log = (...args) => {
  console.log.apply(this, args);
}