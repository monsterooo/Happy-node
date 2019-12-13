const { join } = require('path');
const loadFiles = require('../utils/load/load-files');
const loadConfig = require('../utils/load/load-config-files');

module.exports = async ({ dir }) => {
  const apiDir = join(dir, 'api');
  const apiFiles = await loadFiles(apiDir, '!(config)/**/*.*(js|json)');
  const configFiles = await loadConfig(apiDir, '*/config/**/*.*(js|json)');
  console.log('coreFiles > ', coreFiles);
}