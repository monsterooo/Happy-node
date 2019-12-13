const _ = require('lodash');
const minimatch = require('minimatch');

// environments目录下指定的文件使用文件名作为键
const configMatcher = new minimatch.Minimatch('config/environments/*/+(request|database|server|security|response).+(json|js)');

// 要用文件名键加载的文件
const prefixedPaths = [
  'functions',
  'policies',
  'locales',
  'hook',
  'middleware',
  'language',
  'layout',
];

module.exports = file => {

};
