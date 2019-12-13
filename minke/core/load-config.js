const { join } = require('path');
const { existsSync } = require('fs-extra');
const loadConfig = require('../utils/load/load-config-files');

module.exports = async ({ dir }) => {
  if (!existsSync(join(dir, 'config'))) {
    throw new Error('缺少config目录, 请在根目录创建它');
  }
  const { config } = await loadConfig(dir);
  return config;
}