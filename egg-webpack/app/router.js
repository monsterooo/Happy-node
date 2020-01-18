/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const html = app.middleware.html();
  router.get('/', controller.home.index);
  app.io.of('/').route('chat', app.io.controller.chat.index);
  router.get(/^\/dashboard.*?/, html);
};
