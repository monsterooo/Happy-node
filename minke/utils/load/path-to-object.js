const _ = require('lodash');

/**
 * 根据传递的filePaht返回一个路径数组
 * @param {string} filePath 一个相对文件路径
 * @param {boolean} useFileNameAsKey 是否将文件也作为key
 */
module.exports = (filePath, useFileNameAsKey = true) => {
  const path = filePath.startsWith('./') ? filePath.slice(2) : filePath;
  const keys = path
    .replace(/(\.json|\.js)/g, '')
    .toLowerCase()
    .split('/')
    .map(v => _.trimStart(v, '.'));
  
  return useFileNameAsKey === true ? keys : keys.slice(0, -1);
}