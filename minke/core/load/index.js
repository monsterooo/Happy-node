const loadApp = require('./load-app');
const loadFile = require('./load-file');
const loadConfig = require('./load-config');
const loadConfigWrap = require('./load-config-wrap');
const loadMiddleware = require('./load-middleware');
const loadHook = require('./load-hook');

module.exports = {
  loadFile,
  loadApp,
  loadConfig,
  loadConfigWrap,
  loadMiddleware,
  loadHook,
};
