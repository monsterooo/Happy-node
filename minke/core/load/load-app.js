const _ = require('lodash');
const { join } = require('path');
const { existsSync } = require('fs-extra');
const loadFile = require('./load-file');
const loadConfig = require('./load-config');
/**
 * 加载项目目录下app的文件
 */
module.exports = async ({ dir }) => {
  const appDir = join(dir, 'app');
  if (!existsSync(appDir)) {
    throw new Error('Missing app folder. Please create one in your root directory');
  }
  const app = await loadFile(appDir, '*/!(config)/**/*.*(js|json)');
  const appConfig = await loadConfig(appDir, '*/config/**/*.*(js|json)');

  return _.merge(app, appConfig);
}