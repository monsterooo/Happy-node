const _ = require('lodash');
const minimatch = require('minimatch');

// config/environments/*/下一些指定的文件需要使用文件名作为对象路径
const envMinimatch = new minimatch.Minimatch('config/environments/*/+(request|response|database).+(js|json)');
const filename = [
  'functions',
  'middleware',
]
module.exports = (file) => {
  if(envMinimatch.match(file)) return true;
  return _.some(filename, v => file.indexOf(`config/${v}`) > -1) ? true : false
}