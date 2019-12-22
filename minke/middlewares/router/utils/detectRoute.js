const _ = require('lodash');

/**
 * 检测endpoint中的HTTP动作
 * @param {string} endpoint 一个http动作和路径的字符串
 * @returns {Object} verb pointer
 */

module.exports = endpoint => {
  const verbExpr = /^(all|get|post|put|delete|trace|options|connect|patch|head|redirect)\s+/i;
  let verb = _.last(endpoint.match(verbExpr) || []) || '';
  verb = verb.toLowerCase();

  // 如果指定了动词，则从原始字符串中删除该动词
  if (verb) {
    endpoint = endpoint.replace(verbExpr, '');
  }

  // 返回动词和路径
  return {
    verb,
    endpoint
  };
};
