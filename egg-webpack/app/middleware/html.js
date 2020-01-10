const fsPromises = require('fs').promises;

module.exports = (/* options */) => async function html(ctx) {
  const { app: { env } } = ctx;
  const compiler = global.compiler;
  const htmlPath = compiler.outputPath + '/index.html';
  if (env !== 'prod') {
    const htmlReadable = compiler.outputFileSystem.readFileSync(htmlPath, 'utf8');
    ctx.response.type = 'html';
    ctx.response.body = htmlReadable;
  } else {
    ctx.response.type = 'html';
    ctx.response.body = await fsPromises.readFile(htmlPath);
  }
};

