const _ = require('lodash');

module.exports = {
  globalPolicy: (endpoint, value, route = {}, plugin) => {
    return async (ctx, next) => {
      ctx.request.route = {
        endpoint: _.trim(endpoint),
        controller: vlaue.handler.split('.')[0].toLowerCase(),
        action: value.handler.split('.')[1].toLowerCase(),
        splittedEndpoint: _.trim(route.endpoint),
        verb: route.verb && _.trim(route.verb.toLowerCase()),
        plugin,
      }
      await next();
    }
  }
}