const checkReservedFilename = require('./check-reserved-filename');
const loadFiles = require('./load-files');

module.exports = (dir, pattern = 'config/**/*.+(js|json)') =>
  loadFiles(dir, pattern, { useFileNameAsKey: checkReservedFilename });
