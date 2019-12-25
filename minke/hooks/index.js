const _ = require('lodash');

module.exports = async function() {
  const hookConfig = this.config.hook;
  const hookExists = key => !_.isUndefined(this.hook[key]);
  const hookEnabled = key => _.get(hookConfig, ['settings', key, 'enabled'], false) === true;
  const enabledHook = Object.keys(this.hook).filter(hookEnabled);
  log(enabledHook)
  log('test', enabledHook);
}