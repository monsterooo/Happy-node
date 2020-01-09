'use strict';

module.exports = (/* options */) => async function html(ctx) {
  const compiler = global.compiler;
  const htmlReadable = compiler.outputFileSystem.readFileSync(compiler.outputPath + '/index.html', 'utf8');
  ctx.response.type = 'html';
  ctx.response.body = htmlReadable;
};

