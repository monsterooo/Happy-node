const _ = require('lodash');

/**
 * 将相对路径转换为一个以'/'分割的数组
 * @param {string} filePath 一个相对文件路径
 * @param {boolean} fileNameAsKey 是否将文件名作为路径的一部分
 */
module.exports = (filePath, fileNameAsKey = true) => {
  
  const keys = filePath
    .replace(/(\.settings|\.json|\.js)/g, '')
    .toLowerCase()
    .split('/')
    .map(v => _.trimStart(v, '.'))
    .join('.')
    .split('.')
  
  return fileNameAsKey === true ? keys : keys.slice(0, -1);
}