const { join } = require('path');
const loadFiles = require('../utils/load/load-files');

module.exports = async ({ dir }) => {
  const coreFiles = await loadFiles(dir, '!(config|node_modules)/**/*.*(js|json)');
  console.log('coreFiles > ', coreFiles);
}