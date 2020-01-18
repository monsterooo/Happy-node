/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578561444579_1372';

  // add your middleware config here
  config.middleware = [
    // 'html',
  ];

  // ejs模板后缀映射成.html
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: [ 'connection' ],
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
