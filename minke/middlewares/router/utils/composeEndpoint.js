const _ = require('lodash');
const compose = require('koa-compose');


module.exports = minke => {
  const handleBuild = require('./handleBuild')(minke);
  return (value, plugin, router) => {
    if (_.isEmpty(_.get(value, 'method')) || _.isEmpty(_.get(value, 'path'))) {
      return;
    }
    const endpoint = `${value.method} ${value.path}`;
    const { action } = handleBuild(value, endpoint);
    router[value.method.toLowerCase()](value.path, action)
  }
}