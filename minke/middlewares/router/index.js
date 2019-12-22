const _ = require('lodash');
const composeEndpoint = require('./utils/composeEndpoint');

module.exports = minke => {
  const composeRoute = composeEndpoint(minke);
  return {
    initialize() {
      _.forEach(minke.config.routes, value => {
        composeRoute(value, null, minke.router);
      })
    }
  }
}


