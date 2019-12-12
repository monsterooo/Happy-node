const _ = require('lodash');
const glob = require('../glob');

module.exports = async (
  dir,
  pattern,
  { useFileNameAsKey = () => true } = {}
) => {
  const loadedFiles = {};
  const files = await glob(pattern, { cwd: dir });
  console.log('files >', files);
}