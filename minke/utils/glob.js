const glob = require('glob');

/**
 * 包装glob为promise方式
 * 传递的参数同glob
 */
module.exports = (...args) => {
  return new Promise((resolve, reject) => {
    glob(...args, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    })
  })
}